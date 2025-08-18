import { Metadata } from 'next'
import AdminDashboard from './AdminDashboard'

export const metadata: Metadata = {
  title: 'Admin Dashboard | Adaptive Kitchen',
  description: 'Manage blog posts and content for Adaptive Kitchen.',
}

export default function AdminPage() {
  return <AdminDashboard />
}
