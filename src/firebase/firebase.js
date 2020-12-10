import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const config = require('../firebase-config.json');
firebase.initializeApp(config);

const db = firebase.firestore(),
    auth = firebase.auth(),
    coll_name = 'pc_users',
    coll_name_cards = 'cards';

class FirebaseManager {
    static registerUser(name, email, password, callback) {
        auth
            .createUserWithEmailAndPassword(email, password)
            .then((data) => {
                data.user
                    .updateProfile({
                        displayName: name,
                    })
                    .then(() => {
                        let claimedDefault = new Date();

                        claimedDefault.setDate(claimedDefault.getDate() - 1);
                        db.collection(coll_name)
                            .doc(email)
                            .set({
                                claimed: claimedDefault,
                            })
                            .then(() => {
                                return callback(true, null);
                            });
                    });
            })
            .catch((err) => {
                return callback(false, err.message);
            });
    }

    static loginUser(email, password, callback) {
        auth
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                return callback(true, null)
            })
            .catch((err) => {
                return callback(false, err.message)
            });
    }

    static logOutUser(callback) {
        auth.signOut().then(() => {
            return callback(true, null);
        }).catch((err) => {
            return callback(false, err.message);
        });
    }

    static getUserCards(email, callback) {
        db
            .collection(coll_name)
            .doc(email)
            .collection(coll_name_cards)
            .get()
            .then((snap) => {
                return callback(true, null, snap.docs.map((doc) => doc.data()))
            })
            .catch((err) => {
                return callback(false, err.message, null)
            })
    }

    static discardUserCard(email, card, callback) {
        let query = db
            .collection(coll_name)
            .doc(email)
            .collection(coll_name_cards)
            .doc(card.id);
        if (card.quantity === 1) {
            query.delete()
                .then(() => {
                    return callback(true, null)
                })
                .catch((err) => {
                    return callback(false, err.message)
                })
        } else {
            card.quantity--;
            query.update(card)
                .then(() => {
                    return callback(true, null)
                })
                .catch((err) => {
                    return callback(false, err.message)
                })
        }
    }

    static updateUserCard(email, card, callback){
        db
            .collection(coll_name)
            .doc(email)
            .collection(coll_name_cards)
            .doc(card.id)
            .update(card)
            .then(() => {
                return callback(true, null)
            })
            .catch((err) => {
                return callback(false, err.message)
            })
    }

    static setDailyCards(email, timeNow, pokemonsList, callback) {
        db
            .collection(coll_name)
            .doc(email)
            .get()
            .then((coll) => {
                let lastClaimedTime =
                    coll.data().claimed.toDate().getTime() + 864e5;
                if (lastClaimedTime < timeNow) {
                    db
                        .collection(coll_name)
                        .doc(email)
                        .update({
                            claimed: timeNow,
                        })
                        .then(async () => {
                            let batch = db.batch();
                            for (const card of pokemonsList) {
                                let docRef = db
                                    .collection(coll_name)
                                    .doc(email)
                                    .collection(coll_name_cards)
                                    .doc(card.id);
                                let exists = await docRef.get();

                                if (exists.exists) {
                                    card.quantity++;
                                    batch.update(docRef, card);
                                } else {
                                    card.quantity = 1;
                                    card.obtained = `${timeNow.getDate()}/${timeNow.getMonth()}/${timeNow.getFullYear()} - ${("0" + timeNow.getHours()).slice(-2)}:${("0" + timeNow.getMinutes()).slice(-2)}`
                                    card.description = "";
                                    batch.set(docRef, card);
                                }
                            }
                            batch.commit();
                            return callback(true, null)
                        })
                        .catch((err) => {
                            return callback(false, err.message)
                        });
                } else {
                    let difference = new Date(lastClaimedTime).getTime() - timeNow.getTime(),
                        days = Math.floor(difference / 864e5),
                        hours = Math.floor((difference / 3.6e6 | 0)),
                        mins = Math.round((difference % 3.6e6) / 6e4 | 0);
                    return callback(false, `Seu deck diário já foi coletado hoje. Tente novamente em ${days} dia(s), ${hours} hora(s) e ${mins} minuto(s).`)
                }
            })
            .catch((err) => {
                return callback(false, err.message);
            });
    }
}

export {
    FirebaseManager,
    auth
}