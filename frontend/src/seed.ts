import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

const sampleVideos = [
  {
    title: 'Python for Beginners',
    career: 'Software Developer',
    skill: 'Python',
    difficulty: 'Beginner',
    duration: '12:45',
    thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bfce8?auto=format&fit=crop&w=500&q=60',
    url: 'https://youtube.com/watch?v=sample1',
    creatorName: 'Arjun Raj',
    status: 'Approved',
    views: 1200
  },
  {
    title: 'Data Structures Explained',
    career: 'Software Developer',
    skill: 'Data Structures',
    difficulty: 'Intermediate',
    duration: '14:30',
    thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=500&q=60',
    url: 'https://youtube.com/watch?v=sample2',
    creatorName: 'Arjun Raj',
    status: 'Approved',
    views: 850
  },
  {
    title: 'Machine Learning Basics',
    career: 'Data Scientist',
    skill: 'Machine Learning',
    difficulty: 'Beginner',
    duration: '16:52',
    thumbnail: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=500&q=60',
    url: 'https://youtube.com/watch?v=sample3',
    creatorName: 'Arjun Raj',
    status: 'Approved',
    views: 2400
  }
];

export const seedVideos = async () => {
  for (const video of sampleVideos) {
    await addDoc(collection(db, 'videos'), {
      ...video,
      createdAt: serverTimestamp()
    });
  }
  console.log("Videos seeded!");
};
