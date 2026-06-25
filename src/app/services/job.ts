import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where
} from 'firebase/firestore';
import {
  User,
  onAuthStateChanged
} from 'firebase/auth';
import { auth, db } from '../firebase';
import { Job } from '../models/job';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private collectionName = 'jobs';

  private getCurrentUser(): Promise<User | null> {
  return new Promise((resolve) => {
    if (auth.currentUser) {
      resolve(auth.currentUser);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, user => {
      unsubscribe();
      resolve(user);
    });
  });
}

  async getJobs(): Promise<Job[]> {
    const user = await this.getCurrentUser();

    if (!user) {
      return [];
    }

    const jobsRef = collection(db, this.collectionName);

    const jobsQuery = query(
      jobsRef,
      where('userId', '==', user.uid)
    );

    const snapshot = await getDocs(jobsQuery);

    const jobs = snapshot.docs.map(document => {
      return {
        id: document.id,
        ...document.data()
      } as Job;
    });

    return jobs.sort((a, b) => {
      return b.dateCompleted.localeCompare(a.dateCompleted);
    });
  }

  async addJob(job: Omit<Job, 'id' | 'userId' | 'createdAt'>): Promise<void> {
    const user = await this.getCurrentUser();

    if (!user) {
      throw new Error('You must be logged in to add a job.');
    }

    const jobsRef = collection(db, this.collectionName);

    await addDoc(jobsRef, {
      ...job,
      userId: user.uid,
      createdAt: Date.now()
    });
  }

  async deleteJob(id: string): Promise<void> {
    const user = await this.getCurrentUser();

    if (!user) {
      throw new Error('You must be logged in to delete a job.');
    }

    const jobRef = doc(db, this.collectionName, id);
    await deleteDoc(jobRef);
  }

  async getTotalRevenue(): Promise<number> {
    const jobs = await this.getJobs();
    return jobs.reduce((total, job) => total + Number(job.price), 0);
  }
}
