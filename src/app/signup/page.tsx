'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Logo } from "@/components/logo"
import { AuthForm, AuthInput, AuthButton } from "@/components/auth-form"
import { organizationService } from '@/services/organizationService'
import { Organization } from '@/types/organization'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'



export default function SignUp() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    organizationId: ''
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [organizations, setOrganizations] = useState<Organization[]>([])

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        console.log('Fetching organizations...');
        const orgs = await organizationService.listOrganizations();
        console.log('Organizations received:', orgs);
        setOrganizations(orgs);
      } catch (error) {
        console.error('Failed to fetch organizations:', error);
      }
    };
    
    fetchOrganizations();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch(`https://take-home-reekon.vercel.app/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Signup failed')
      }

      const data = await response.json()
      localStorage.setItem('token', data.token)
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-black">
      <div className="w-full max-w-[400px] space-y-6">
        <Logo />
        <AuthForm 
          title="Sign Up" 
          description="Create your account to get started"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-2 gap-4">
            <AuthInput
              id="firstName"
              label="First Name"
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              required
              disabled={isLoading}
            />
            <AuthInput
              id="lastName"
              label="Last Name"
              type="text"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              required
              disabled={isLoading}
            />
          </div>
          <AuthInput
            id="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            disabled={isLoading}
          />
          <AuthInput
            id="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            disabled={isLoading}
          />
          <AuthInput
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            required
            disabled={isLoading}
          />
          <div className="space-y-2">
            <label className="text-sm font-medium">Organization</label>
            <Select
              value={formData.organizationId}
              onValueChange={(value) => setFormData({ ...formData, organizationId: value })}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Organization" />
              </SelectTrigger>
              <SelectContent>
                {organizations.map((org) => (
                  <SelectItem key={org.id} value={org.id}>
                    {org.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="text-sm text-center text-neutral-400">
            Can't find your organization?{" "}
            <Link href="/create-organization" className="text-[#FFD700] hover:text-[#FFD700]/90">
              Create one
            </Link>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <AuthButton type="submit" isLoading={isLoading}>
            Sign Up
          </AuthButton>
          <div className="text-sm text-center text-neutral-400">
            Already have an account?{" "}
            <Link href="/login" className="text-[#FFD700] hover:text-[#FFD700]/90">
              Login
            </Link>
          </div>
        </AuthForm>
      </div>
    </main>
  )
}

