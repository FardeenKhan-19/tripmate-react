// src/services/firestoreService.js

import { db } from '../firebase';
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

/**
 * Creates a new trip document in Firestore for a specific user.
 * @param {string} userId - The ID of the user creating the trip.
 * @param {object} tripData - The data for the new trip (e.g., { name: 'Trip to Paris', budget: 2000 }).
 * @returns {Promise<string>} The ID of the newly created trip document.
 */
export const createTrip = async (userId, tripData) => {
    try {
        const docRef = await addDoc(collection(db, "users", userId, "trips"), tripData);
        console.log("Trip created with ID: ", docRef.id);
        return docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
        throw new Error("Could not create trip.");
    }
};

/**
 * Fetches all trips for a specific user.
 * @param {string} userId - The ID of the user whose trips to fetch.
 * @returns {Promise<Array>} An array of trip objects.
 */
export const getUserTrips = async (userId) => {
    const trips = [];
    const q = query(collection(db, "users", userId, "trips"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        trips.push({ id: doc.id, ...doc.data() });
    });

    return trips;
};

// You will add more functions here for itineraries, expenses, etc.