import { redirect } from 'next/navigation';

export default function HomePage() {
  // Redirect to waitlist page
  redirect('/waitlist');
}
