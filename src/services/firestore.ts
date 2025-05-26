import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  Timestamp,
  orderBy,
  DocumentReference,
  QuerySnapshot,
  DocumentData
} from 'firebase/firestore';
// import { db } from './firebaseConfig';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Define interfaces for your form data
interface ApplicationData {
  [key: string]: any;
  submittedAt?: Date;
}

interface ApplicationWithId extends ApplicationData {
  id: string;
  submittedAt: Date;
}



export const submitApplication = async (formData: ApplicationData): Promise<string> => {
  try {
    const docRef: DocumentReference = await addDoc(collection(db, "applications"), {
      ...formData,
      submittedAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error submitting application:", error);
    throw error;
  }
};

export const submitFormApplication = async (formData: ApplicationData): Promise<string> => {
  try {
    const docRef: DocumentReference = await addDoc(collection(db, "leadershipApplications"), {
      ...formData,
      submittedAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error details:", {
      message: (error as Error).message,
      code: (error as any).code,
      stack: (error as Error).stack
    });
    throw error;
  }
};

export const submitTechApplication = async (formData: ApplicationData): Promise<string> => {
  try {
    const docRef: DocumentReference = await addDoc(collection(db, "techApplications"), {
      ...formData,
      submittedAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error submitting tech application:", error);
    throw error;
  }
};

export const submitContactForm = async (formData: ApplicationData): Promise<string> => {
  try {
    const docRef: DocumentReference = await addDoc(collection(db, "contactForms"), {
      ...formData,
      submittedAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error submitting contact form:", error);
    throw error;
  }
};

export const submitVolunteerForm = async (formData: ApplicationData): Promise<string> => {
  try {
    const docRef: DocumentReference = await addDoc(collection(db, "volunteerApplications"), {
      ...formData,
      submittedAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error submitting volunteer form:", error);
    throw error;
  }
};

export const fetchApplications = async (): Promise<ApplicationWithId[]> => {
  try {
    const q = query(
      collection(db, "applications"), 
      orderBy("submittedAt", "desc")
    );
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        submittedAt: data.submittedAt.toDate()
      } as ApplicationWithId;
    });
  } catch (error) {
    console.error("Error fetching applications:", error);
    throw error;
  }
};

export { db };