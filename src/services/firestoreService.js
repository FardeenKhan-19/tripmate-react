import { db } from '../firebase';
import { 
    collection, 
    doc, 
    addDoc, 
    getDocs, 
    updateDoc, 
    deleteDoc, 
    onSnapshot,
    getDoc,
    writeBatch // Batch writes ke liye import karein
} from 'firebase/firestore';

// --- Trip Functions ---

export const createTrip = async (userId, tripData) => {
    const tripsCollectionRef = collection(db, 'users', userId, 'trips');
    const docRef = await addDoc(tripsCollectionRef, {
        ...tripData,
        createdAt: new Date()
    });
    return { id: docRef.id, ...tripData };
};

export const getTrips = async (userId) => {
    const tripsCollectionRef = collection(db, 'users', userId, 'trips');
    const querySnapshot = await getDocs(tripsCollectionRef);
    const trips = [];
    querySnapshot.forEach((doc) => {
        trips.push({ id: doc.id, ...doc.data() });
    });
    return trips;
};

export const getTripDetails = async (userId, tripId) => {
    const tripDocRef = doc(db, 'users', userId, 'trips', tripId);
    const docSnap = await getDoc(tripDocRef);
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
    } else {
        console.error("No such trip found!");
        return null;
    }
};

// NAYA FUNCTION: Trip ko update karne ke liye
export const updateTrip = async (userId, tripId, tripData) => {
    const tripDocRef = doc(db, 'users', userId, 'trips', tripId);
    await updateDoc(tripDocRef, tripData);
};

// NAYA FUNCTION: Trip ko delete karne ke liye (sub-collections ke saath)
export const deleteTrip = async (userId, tripId) => {
    const tripDocRef = doc(db, 'users', userId, 'trips', tripId);
    
    // Ek batch banayein taaki saare operations ek saath hon
    const batch = writeBatch(db);

    // Itinerary sub-collection ke saare documents delete karein
    const itineraryRef = collection(db, tripDocRef.path, 'itinerary');
    const itinerarySnapshot = await getDocs(itineraryRef);
    itinerarySnapshot.forEach(doc => batch.delete(doc.ref));

    // Expenses sub-collection ke saare documents delete karein
    const expensesRef = collection(db, tripDocRef.path, 'expenses');
    const expensesSnapshot = await getDocs(expensesRef);
    expensesSnapshot.forEach(doc => batch.delete(doc.ref));

    // Aakhir mein, trip document ko delete karein
    batch.delete(tripDocRef);

    // Batch ko commit karein
    await batch.commit();
};


// --- Itinerary and Expense functions ---
// ... baaki saara code ...
export const getItineraryItemsStream = (userId, tripId, callback, onError) => {
    const itineraryCollectionRef = collection(db, 'users', userId, 'trips', tripId, 'itinerary');
    
    const unsubscribe = onSnapshot(itineraryCollectionRef, (querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
            items.push({ id: doc.id, ...doc.data() });
        });
        callback(items);
    }, (error) => {
        console.error("Error fetching itinerary in real-time: ", error);
        onError(error);
    });

    return unsubscribe;
};

export const saveItineraryItem = async (userId, tripId, itemData) => {
    const itineraryCollectionRef = collection(db, 'users', userId, 'trips', tripId, 'itinerary');
    if (itemData.id) {
        const itemDocRef = doc(db, 'users', userId, 'trips', tripId, 'itinerary', itemData.id);
        await updateDoc(itemDocRef, itemData);
        return itemData;
    } else {
        const docRef = await addDoc(itineraryCollectionRef, itemData);
        return { id: docRef.id, ...itemData };
    }
};

export const deleteItineraryItem = async (userId, tripId, itemId) => {
    const itemDocRef = doc(db, 'users', userId, 'trips', tripId, 'itinerary', itemId);
    await deleteDoc(itemDocRef);
};

export const getExpensesStream = (userId, tripId, callback, onError) => {
    const expensesCollectionRef = collection(db, 'users', userId, 'trips', tripId, 'expenses');

    const unsubscribe = onSnapshot(expensesCollectionRef, (querySnapshot) => {
        const expenses = [];
        querySnapshot.forEach((doc) => {
            expenses.push({ id: doc.id, ...doc.data() });
        });
        callback(expenses);
    }, (error) => {
        console.error("Error fetching expenses in real-time: ", error);
        onError(error);
    });

    return unsubscribe;
};

export const saveExpense = async (userId, tripId, expenseData) => {
    const expensesCollectionRef = collection(db, 'users', userId, 'trips', tripId, 'expenses');
    if (expenseData.id) {
        const expenseDocRef = doc(db, 'users', userId, 'trips', tripId, 'expenses', expenseData.id);
        await updateDoc(expenseDocRef, expenseData);
        return expenseData;
    } else {
        const docRef = await addDoc(expensesCollectionRef, expenseData);
        return { id: docRef.id, ...expenseData };
    }
};

export const deleteExpense = async (userId, tripId, expenseId) => {
    const expenseDocRef = doc(db, 'users', userId, 'trips', tripId, 'expenses', expenseId);
    await deleteDoc(expenseDocRef);
};
