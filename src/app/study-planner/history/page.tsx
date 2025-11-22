import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getCompletedTasks } from '@/lib/actions';
import HistoryClient from './HistoryClient';

export default async function HistoryPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  const completedTasks = await getCompletedTasks(session.user.id);

  return <HistoryClient tasks={completedTasks} />;
}
