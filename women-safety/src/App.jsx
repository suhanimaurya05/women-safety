import { useEffect, useMemo, useState } from 'react'
import {
  AlertTriangle,
  Bell,
  Check,
  ChevronRight,
  Eye,
  EyeOff,
  HeartHandshake,
  HelpCircle,
  MapPinned,
  Menu,
  Moon,
  Navigation,
  Phone,
  Plus,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Siren,
  Trash2,
  User,
  UserRound,
  Users,
} from 'lucide-react'
import './App.css'

const navItems = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'contacts', label: 'Emergency Contacts' },
  { id: 'location', label: 'Live Location' },
  { id: 'help', label: 'Nearby Help' },
  { id: 'route', label: 'Safe Route' },
  { id: 'fake-call', label: 'Fake Call' },
  { id: 'incident', label: 'Report Incident' },
  { id: 'settings', label: 'Settings' },
]

const defaultContacts = [
  { id: 1, name: 'Maya Singh', phone: '+91 98765 43210', relation: 'Sister', primary: true },
  { id: 2, name: 'Aarav Mehta', phone: '+91 99887 11223', relation: 'Friend', primary: false },
  { id: 3, name: 'Nisha Rao', phone: '+91 98222 33445', relation: 'Neighbor', primary: false },
]

const nearbyHelp = [
  { name: 'Banjara Police Station', distance: '0.8 km', address: '20 Market Road, Sector 12', type: 'Police' },
  { name: 'CityCare Hospital', distance: '1.3 km', address: '9 Wellness Avenue, Green Park', type: 'Hospital' },
  { name: 'Emergency Response Unit', distance: '1.9 km', address: '34 Safety Lane, Cantonment', type: 'Emergency Services' },
  { name: 'Shanti Medical Clinic', distance: '2.7 km', address: '12 Baner Road, Old Town', type: 'Hospital' },
]

const safeRouteOptions = [
  { id: 'short', label: 'Fastest', detail: '6.4 km • 19 min', safety: 'Moderate' },
  { id: 'safe', label: 'Safer route', detail: '7.6 km • 24 min', safety: 'High' },
  { id: 'well-lit', label: 'Well-lit route', detail: '8.2 km • 26 min', safety: 'High' },
]

const fakeCallers = ['Mom', 'Dad', 'Friend', 'Custom']
const incidentOptions = ['Harassment', 'Suspicious activity', 'Unsafe area', 'Stalking', 'Other']

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  const [currentView, setCurrentView] = useState('dashboard')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [sosState, setSosState] = useState('safe')
  const [sosCountdown, setSosCountdown] = useState(3)
  const [liveSharing, setLiveSharing] = useState(false)
  const [selectedContactIds, setSelectedContactIds] = useState([1, 2])
  const [contacts, setContacts] = useState(defaultContacts)
  const [showContactForm, setShowContactForm] = useState(false)
  const [newContact, setNewContact] = useState({ name: '', phone: '', relation: '' })
  const [helpFilter, setHelpFilter] = useState('All')
  const [locationEnabled, setLocationEnabled] = useState(true)
  const [routeSelection, setRouteSelection] = useState('safe')
  const [reportSubmitted, setReportSubmitted] = useState(false)
  const [fakeCallName, setFakeCallName] = useState('Mom')
  const [fakeCallDelay, setFakeCallDelay] = useState('3 sec')
  const [fakeCallActive, setFakeCallActive] = useState(false)
  const [channelStatus, setChannelStatus] = useState('Incoming call')

  useEffect(() => {
    if (sosState !== 'countdown') return undefined

    const timer = setTimeout(() => {
      setSosCountdown((current) => {
        if (current <= 1) {
          setSosState('active')
          setLiveSharing(true)
          return 0
        }
        return current - 1
      })
    }, 1000)

    return () => clearTimeout(timer)
  }, [sosState, sosCountdown])

  const filteredHelp = useMemo(() => {
    if (helpFilter === 'All') return nearbyHelp
    return nearbyHelp.filter((item) => item.type === helpFilter)
  }, [helpFilter])

  const activeContacts = contacts.filter((contact) => selectedContactIds.includes(contact.id))

  const handleSosPressStart = () => {
    if (sosState === 'active') return
    setSosCountdown(3)
    setSosState('countdown')
  }

  const handleSosPressEnd = () => {
    if (sosState === 'countdown') {
      setSosState('safe')
      setSosCountdown(3)
    }
  }

  const handleSafeLogin = (event) => {
    event.preventDefault()
    setIsLoggedIn(true)
    setCurrentView('dashboard')
  }

  const handleSignUp = (event) => {
    event.preventDefault()
    setAuthMode('onboarding')
  }

  const handleOnboardingComplete = () => {
    setIsLoggedIn(true)
    setCurrentView('dashboard')
    setAuthMode('login')
  }

  const handleAddContact = (event) => {
    event.preventDefault()
    if (!newContact.name || !newContact.phone || !newContact.relation) return

    const contact = {
      id: Date.now(),
      name: newContact.name,
      phone: newContact.phone,
      relation: newContact.relation,
      primary: contacts.length === 0,
    }

    setContacts((current) => [contact, ...current])
    setSelectedContactIds((current) => [...current, contact.id])
    setNewContact({ name: '', phone: '', relation: '' })
    setShowContactForm(false)
  }

  const deleteContact = (id) => {
    setContacts((current) => current.filter((contact) => contact.id !== id))
    setSelectedContactIds((current) => current.filter((value) => value !== id))
  }

  const toggleContactSelection = (id) => {
    setSelectedContactIds((current) =>
      current.includes(id) ? current.filter((value) => value !== id) : [...current, id],
    )
  }

  const handleSubmitReport = (event) => {
    event.preventDefault()
    setReportSubmitted(true)
  }

  const handleFakeCallStart = () => {
    setFakeCallActive(true)
    setChannelStatus('Incoming call')
  }

  const handleFakeCallEnd = () => {
    setFakeCallActive(false)
    setChannelStatus('Incoming call')
  }

  const renderAuthView = () => {
    if (authMode === 'onboarding') {
      return (
        <div className="min-h-screen bg-[#f5f4fb] px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl rounded-[32px] bg-white p-6 shadow-[0_30px_90px_rgba(79,70,229,0.09)] ring-1 ring-slate-200 sm:p-8 lg:p-10">
            <div className="mb-8 flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-indigo-600">Setup</p>
                <h2 className="mt-2 text-3xl font-bold text-slate-900">Welcome to SafeCircle</h2>
              </div>
              <div className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">Step 3 of 3</div>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {[
                { title: '1. SOS activation', text: 'Hold the SOS button for 3 seconds to alert emergency contacts and begin live location sharing.', icon: <Siren className="h-7 w-7" /> },
                { title: '2. Trusted contacts', text: 'Add your emergency contacts and decide who gets notified when you activate SOS.', icon: <Users className="h-7 w-7" /> },
                { title: '3. Live location', text: 'Share your location securely with your chosen contacts during emergencies and route planning.', icon: <MapPinned className="h-7 w-7" /> },
              ].map((item) => (
                <div key={item.title} className="rounded-[26px] border border-slate-200 bg-slate-50 p-5">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700">{item.icon}</div>
                  <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
              <button type="button" onClick={() => setAuthMode('signup')} className="rounded-xl border border-slate-200 px-4 py-3 font-medium text-slate-700 hover:border-slate-300 hover:bg-slate-50">Back</button>
              <button type="button" onClick={handleOnboardingComplete} className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500">Continue to dashboard</button>
            </div>
          </div>
        </div>
      )
    }

    const isLogin = authMode === 'login'

    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.12),_rgba(255,255,255,0.92)_32%,_#f5f4fb_100%)] px-4 py-8 sm:px-6">
        <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[36px] bg-white shadow-[0_30px_90px_rgba(15,23,42,0.08)] ring-1 ring-slate-200 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="relative hidden overflow-hidden bg-slate-950 p-8 text-white lg:block">
            <div className="safety-grid absolute inset-0 opacity-30" />
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-200 ring-1 ring-indigo-300/30">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xl font-semibold">SafeCircle</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Women Safety</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                  <p className="text-sm uppercase tracking-[0.22em] text-slate-300">Safety first</p>
                  <h1 className="mt-3 text-4xl font-semibold leading-tight text-white">Trust you can feel in a crisis.</h1>
                </div>

                <div className="grid gap-3 text-sm text-slate-200">
                  <div className="flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-3">
                    <ShieldAlert className="h-5 w-5 text-rose-400" />
                    Emergency SOS with live location
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-3">
                    <HeartHandshake className="h-5 w-5 text-emerald-400" />
                    Trusted contact notifications
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-3">
                    <Navigation className="h-5 w-5 text-cyan-400" />
                    Safer route guidance and nearby help
                  </div>
                </div>
              </div>

              <div className="text-xs text-slate-300">Built for quick decisions, clear guidance, and real-world protection.</div>
            </div>
          </div>

          <div className="flex items-center justify-center p-6 sm:p-8 lg:p-10">
            <div className="w-full max-w-md">
              <div className="mb-8 lg:hidden">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xl font-semibold text-slate-900">SafeCircle</p>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Women Safety</p>
                  </div>
                </div>
              </div>

              <div className="mb-6 flex rounded-xl bg-slate-100 p-1">
                <button type="button" onClick={() => setAuthMode('login')} className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition ${isLogin ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'}`}>
                  Login
                </button>
                <button type="button" onClick={() => setAuthMode('signup')} className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition ${!isLogin ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'}`}>
                  Sign Up
                </button>
              </div>

              {isLogin ? (
                <form onSubmit={handleSafeLogin} className="space-y-5">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Welcome back</p>
                    <h2 className="mt-2 text-3xl font-bold text-slate-900">Secure access</h2>
                  </div>

                  <label className="block text-sm font-medium text-slate-700">
                    Email or phone number
                    <input className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100" type="text" placeholder="you@example.com" defaultValue="sara@safecircle.app" />
                  </label>

                  <label className="block text-sm font-medium text-slate-700">
                    Password
                    <div className="mt-2 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-indigo-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-100">
                      <input className="w-full bg-transparent text-base text-slate-900 outline-none" type={showPassword ? 'text' : 'password'} placeholder="Enter your password" defaultValue="password123" />
                      <button type="button" onClick={() => setShowPassword((value) => !value)} className="text-slate-500 hover:text-slate-700" aria-label="Toggle password visibility">
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </label>

                  <div className="flex items-center justify-between text-sm">
                    <label className="inline-flex items-center gap-2 text-slate-600">
                      <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" defaultChecked />
                      Remember me
                    </label>
                    <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">Forgot password?</button>
                  </div>

                  <button type="submit" className="mt-2 w-full rounded-xl bg-indigo-600 px-4 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500">Login</button>

                  <p className="text-center text-sm text-slate-600">
                    New here?{' '}
                    <button type="button" onClick={() => setAuthMode('signup')} className="font-semibold text-indigo-600 hover:text-indigo-500">Create an account</button>
                  </p>
                </form>
              ) : (
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Join safely</p>
                    <h2 className="mt-2 text-3xl font-bold text-slate-900">Create your account</h2>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block text-sm font-medium text-slate-700 sm:col-span-2">
                      Full name
                      <input className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100" type="text" placeholder="Your full name" defaultValue="Sara Kaur" />
                    </label>
                    <label className="block text-sm font-medium text-slate-700 sm:col-span-2">
                      Email
                      <input className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100" type="email" placeholder="you@example.com" defaultValue="sara@safecircle.app" />
                    </label>
                    <label className="block text-sm font-medium text-slate-700 sm:col-span-2">
                      Phone number
                      <input className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100" type="tel" placeholder="+91 98765 43210" defaultValue="+91 98765 43210" />
                    </label>
                    <label className="block text-sm font-medium text-slate-700 sm:col-span-2">
                      Emergency contact
                      <input className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100" type="text" placeholder="Contact name" defaultValue="Maya Singh" />
                    </label>
                    <label className="block text-sm font-medium text-slate-700">
                      Password
                      <div className="mt-2 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-indigo-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-100">
                        <input className="w-full bg-transparent text-slate-900 outline-none" type={showPassword ? 'text' : 'password'} placeholder="Create password" defaultValue="password123" />
                        <button type="button" onClick={() => setShowPassword((value) => !value)} className="text-slate-500 hover:text-slate-700" aria-label="Toggle password visibility">
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </label>
                    <label className="block text-sm font-medium text-slate-700">
                      Confirm password
                      <div className="mt-2 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-indigo-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-indigo-100">
                        <input className="w-full bg-transparent text-slate-900 outline-none" type={showConfirmPassword ? 'text' : 'password'} placeholder="Confirm password" defaultValue="password123" />
                        <button type="button" onClick={() => setShowConfirmPassword((value) => !value)} className="text-slate-500 hover:text-slate-700" aria-label="Toggle confirm password visibility">
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </label>
                  </div>

                  <label className="inline-flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-600">
                    <input type="checkbox" className="mt-0.5 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" defaultChecked />
                    <span>I agree to the terms and privacy policy, and I confirm my emergency contact details are accurate.</span>
                  </label>

                  <button type="submit" className="w-full rounded-xl bg-indigo-600 px-4 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500">Create account</button>

                  <p className="text-center text-sm text-slate-600">
                    Already have an account?{' '}
                    <button type="button" onClick={() => setAuthMode('login')} className="font-semibold text-indigo-600 hover:text-indigo-500">Login</button>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderTopBar = () => (
    <header className="safe-card sticky top-0 z-20 mb-6 flex items-center justify-between rounded-[28px] px-4 py-3 sm:px-5">
      <div className="flex items-center gap-3">
        <button type="button" className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 md:hidden" aria-label="Open navigation">
          <Menu className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700 ring-1 ring-indigo-200">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <p className="text-lg font-semibold text-slate-900">SafeCircle</p>
            <p className="text-[11px] uppercase tracking-[0.23em] text-slate-500">Live safety</p>
          </div>
        </div>
      </div>

      <div className="hidden items-center gap-2 rounded-full bg-slate-100 p-1 md:flex">
        <button type="button" className="rounded-full bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm">Safe</button>
        <button type="button" className="rounded-full px-3 py-1.5 text-sm font-medium text-slate-500">Status</button>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <button type="button" className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 transition hover:bg-slate-200" aria-label="Notifications">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2.5 top-2.5 h-2.5 w-2.5 rounded-full bg-rose-500" />
        </button>
        <button type="button" className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 transition hover:bg-slate-200" aria-label="Settings">
          <Shield className="h-5 w-5" />
        </button>
        <button type="button" onClick={() => setCurrentView('settings')} className="flex items-center gap-2 rounded-2xl bg-slate-900 px-3 py-2.5 text-sm font-medium text-white shadow-sm sm:px-4">
          <UserRound className="h-4 w-4" />
          <span className="hidden sm:inline">Sara</span>
        </button>
      </div>
    </header>
  )

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="safe-card rounded-[30px] p-4 sm:p-6">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-slate-500">Your status</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">{sosState === 'active' ? 'SOS Active' : "You're Safe"}</h2>
          </div>
          <div className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold ${sosState === 'active' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
            <span className={`h-2.5 w-2.5 rounded-full ${sosState === 'active' ? 'bg-rose-500' : 'bg-emerald-500'}`} />
            {sosState === 'active' ? 'Emergency' : 'Safe'}
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.18fr_0.82fr]">
          <div className="soft-gradient rounded-[28px] border border-slate-200 p-4 sm:p-6">
            <div className="flex flex-col items-center justify-center gap-4 py-4 text-center">
              <button
                type="button"
                onMouseDown={handleSosPressStart}
                onMouseUp={handleSosPressEnd}
                onMouseLeave={handleSosPressEnd}
                onTouchStart={handleSosPressStart}
                onTouchEnd={handleSosPressEnd}
                className={`sos-pulse relative flex h-44 w-44 items-center justify-center rounded-full border-8 text-center transition ${sosState === 'active' ? 'border-rose-600 bg-rose-600 text-white shadow-[0_20px_40px_rgba(239,68,68,0.35)]' : 'border-rose-200 bg-rose-500 text-white shadow-[0_24px_48px_rgba(239,68,68,0.24)]'}`}
                aria-label="Emergency SOS button"
              >
                <div className="absolute inset-2 rounded-full border border-white/40" />
                <div className="relative z-10">
                  <div className="text-xs font-semibold uppercase tracking-[0.25em] text-white/80">{sosState === 'active' ? 'Active' : 'SOS'}</div>
                  <div className="mt-2 text-2xl font-black">{sosState === 'countdown' ? `${sosCountdown}s` : 'EMERGENCY'}</div>
                </div>
              </button>

              <div className="space-y-2 text-center">
                <p className="text-xl font-semibold text-slate-900">Emergency SOS</p>
                <p className="text-sm text-slate-600">Press and hold for 3 seconds</p>
              </div>

              {sosState === 'countdown' && (
                <div className="w-full rounded-2xl bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800 ring-1 ring-amber-200">
                  Activating SOS in {sosCountdown} seconds. You can cancel before activation.
                </div>
              )}

              {sosState === 'active' && (
                <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
                  <button type="button" className="rounded-xl bg-white px-4 py-2.5 font-medium text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50">Call emergency services</button>
                  <button type="button" onClick={() => setSosState('safe')} className="rounded-xl bg-slate-900 px-4 py-2.5 font-medium text-white hover:bg-slate-800">End SOS</button>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            {sosState === 'active' ? (
              <>
                <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4">
                  <div className="mb-2 flex items-center gap-2 text-rose-700"><Siren className="h-4 w-4" /> <span className="font-semibold">SOS activated</span></div>
                  <p className="text-sm text-rose-700">Current location: 14th Street, Green Park, New Delhi</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-sm font-semibold text-slate-900">Emergency updates</p>
                  <ul className="mt-3 space-y-3 text-sm text-slate-600">
                    <li className="flex items-center justify-between"><span>Location sharing</span><span className="font-medium text-emerald-700">Active</span></li>
                    <li className="flex items-center justify-between"><span>Contacts notified</span><span className="font-medium text-slate-800">{activeContacts.length}</span></li>
                    <li className="flex items-center justify-between"><span>Network status</span><span className="font-medium text-slate-800">Stable</span></li>
                  </ul>
                </div>
              </>
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <p className="text-sm font-semibold text-slate-900">Location status</p>
                  <button type="button" onClick={() => setLocationEnabled((value) => !value)} className={`rounded-full px-2.5 py-1 text-xs font-semibold ${locationEnabled ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                    {locationEnabled ? 'Enabled' : 'Location disabled'}
                  </button>
                </div>
                <div className="mt-4 space-y-3 text-sm text-slate-600">
                  <p className="flex items-center justify-between"><span>Precise location</span><span className="font-medium text-slate-900">On</span></p>
                  <p className="flex items-center justify-between"><span>Last update</span><span className="font-medium text-slate-900">2 min ago</span></p>
                  <p className="flex items-center justify-between"><span>Emergency contacts</span><span className="font-medium text-slate-900">{activeContacts.length} linked</span></p>
                </div>
                {!locationEnabled && (
                  <div className="mt-4 rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-800 ring-1 ring-amber-200">
                    Location permission is required to share your live location during emergencies.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="safe-card rounded-3xl p-5">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">Safe route</p>
            <MapPinned className="h-5 w-5 text-indigo-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900">7.6 km</p>
          <p className="mt-1 text-sm text-slate-600">Safer route available</p>
        </div>
        <div className="safe-card rounded-3xl p-5">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">Trusted contacts</p>
            <User className="h-5 w-5 text-emerald-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900">{contacts.length}</p>
          <p className="mt-1 text-sm text-slate-600">Contacts ready to receive alerts</p>
        </div>
        <div className="safe-card rounded-3xl p-5">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">Nearby help</p>
            <AlertTriangle className="h-5 w-5 text-amber-600" />
          </div>
          <p className="text-2xl font-bold text-slate-900">3</p>
          <p className="mt-1 text-sm text-slate-600">Services detected nearby</p>
        </div>
      </div>
    </div>
  )

  const renderContacts = () => (
    <div className="space-y-6">
      <div className="safe-card rounded-[28px] p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-slate-500">Emergency contacts</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">Trusted circle</h2>
          </div>
          <button type="button" onClick={() => setShowContactForm((value) => !value)} className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500">
            <Plus className="h-4 w-4" /> Add contact
          </button>
        </div>

        <p className="mt-4 text-sm text-slate-600">Your selected emergency contacts can be notified when you activate SOS.</p>
      </div>

      {showContactForm && (
        <div className="safe-card rounded-[28px] p-5 sm:p-6">
          <form onSubmit={handleAddContact} className="grid gap-4 md:grid-cols-3">
            <label className="block text-sm font-medium text-slate-700">
              Name
              <input value={newContact.name} onChange={(event) => setNewContact({ ...newContact, name: event.target.value })} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100" type="text" placeholder="Contact name" />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Phone number
              <input value={newContact.phone} onChange={(event) => setNewContact({ ...newContact, phone: event.target.value })} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100" type="tel" placeholder="+91 98765 43210" />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Relationship
              <input value={newContact.relation} onChange={(event) => setNewContact({ ...newContact, relation: event.target.value })} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100" type="text" placeholder="Sister" />
            </label>
            <div className="md:col-span-3 flex items-center justify-end gap-3">
              <button type="button" onClick={() => setShowContactForm(false)} className="rounded-xl border border-slate-200 px-4 py-3 font-medium text-slate-700 hover:bg-slate-50">Cancel</button>
              <button type="submit" className="rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white hover:bg-indigo-500">Save contact</button>
            </div>
          </form>
        </div>
      )}

      {contacts.length === 0 ? (
        <div className="safe-card rounded-[28px] p-8 text-center">
          <Users className="mx-auto h-14 w-14 text-slate-300" />
          <h3 className="mt-4 text-xl font-semibold text-slate-900">No emergency contacts yet</h3>
          <p className="mt-2 text-sm text-slate-600">Add trusted people who can receive alerts when you need help.</p>
        </div>
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {contacts.map((contact) => (
            <div key={contact.id} className="safe-card rounded-[28px] p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-xl font-semibold text-slate-900">{contact.name}</p>
                    {contact.primary && <span className="rounded-full bg-indigo-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-indigo-700">Primary</span>}
                  </div>
                  <p className="mt-1 text-sm text-slate-500">{contact.relation}</p>
                </div>
                <button type="button" onClick={() => toggleContactSelection(contact.id)} className={`rounded-full px-2.5 py-1 text-xs font-semibold ${selectedContactIds.includes(contact.id) ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                  {selectedContactIds.includes(contact.id) ? 'Selected' : 'Not selected'}
                </button>
              </div>

              <div className="mt-4 rounded-2xl bg-slate-50 px-3 py-2 text-sm text-slate-700">{contact.phone}</div>

              <div className="mt-5 flex gap-2">
                <button type="button" className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-3 py-3 font-medium text-white hover:bg-emerald-500">
                  <Phone className="h-4 w-4" /> Call
                </button>
                <button type="button" className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-3 font-medium text-slate-700 hover:bg-slate-50">
                  <UserRound className="h-4 w-4" /> Edit
                </button>
                <button type="button" onClick={() => deleteContact(contact.id)} className="flex h-[48px] w-[48px] items-center justify-center rounded-xl border border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100" aria-label={`Delete ${contact.name}`}>
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  const renderLocation = () => (
    <div className="space-y-6">
      <div className="safe-card rounded-[28px] p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-slate-500">Live location</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">Safe location sharing</h2>
          </div>
          <div className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold ${liveSharing ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
            <span className={`h-2.5 w-2.5 rounded-full ${liveSharing ? 'bg-emerald-500' : 'bg-slate-500'}`} />
            {liveSharing ? 'Live location sharing is active.' : 'Not active'}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="safe-card rounded-[30px] p-4 sm:p-5">
          <div className="map-shell relative h-[420px] rounded-[26px] border border-slate-200">
            <div className="absolute left-[56%] top-[40%] flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-600/25 ring-8 ring-indigo-100">
              <MapPinned className="h-5 w-5" />
            </div>
            <div className="absolute left-[18%] top-[24%] rounded-2xl border border-slate-200 bg-white/90 px-3 py-2 text-sm font-medium text-slate-700 shadow-md">
              Your location
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl bg-white/90 px-4 py-3 shadow-md ring-1 ring-slate-200 backdrop-blur-sm">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Accuracy</p>
                <p className="text-base font-semibold text-slate-900">± 12 m</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Duration</p>
                <p className="text-base font-semibold text-slate-900">00:18:44</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="safe-card rounded-[28px] p-5">
            <p className="text-sm font-semibold text-slate-900">Sharing status</p>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <div className="flex items-center justify-between"><span>Signal</span><span className="font-medium text-emerald-700">Strong</span></div>
              <div className="flex items-center justify-between"><span>Recipients</span><span className="font-medium text-slate-900">{activeContacts.length} contacts</span></div>
              <div className="flex items-center justify-between"><span>Pause</span><span className="font-medium text-slate-900">Auto-enabled</span></div>
            </div>
          </div>

          <div className="safe-card rounded-[28px] p-5">
            <div className="space-y-3">
              <button type="button" onClick={() => setLiveSharing(true)} className="w-full rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white hover:bg-indigo-500">Start sharing</button>
              <button type="button" onClick={() => setLiveSharing(false)} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-700 hover:bg-slate-50">Stop sharing</button>
              <button type="button" onClick={() => setCurrentView('contacts')} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-700 hover:bg-slate-50">Share with emergency contacts</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderHelp = () => (
    <div className="space-y-6">
      <div className="safe-card rounded-[28px] p-5 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-slate-500">Nearby help</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">Emergency services nearby</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {['All', 'Police', 'Hospital', 'Emergency Services'].map((category) => (
              <button key={category} type="button" onClick={() => setHelpFilter(category)} className={`rounded-full px-3 py-2 text-sm font-medium ${helpFilter === category ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          {filteredHelp.length === 0 ? (
            <div className="safe-card rounded-[28px] p-8 text-center text-slate-600">
              <AlertTriangle className="mx-auto h-14 w-14 text-slate-300" />
              <p className="mt-4 text-lg font-semibold text-slate-900">No nearby services found</p>
              <p className="mt-2 text-sm">Try broadening your search or check location permissions.</p>
            </div>
          ) : (
            filteredHelp.map((item) => (
              <div key={item.name} className="safe-card rounded-[28px] p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xl font-semibold text-slate-900">{item.name}</p>
                    <p className="mt-1 text-sm text-slate-500">{item.type}</p>
                  </div>
                  <div className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                    {item.distance}
                  </div>
                </div>
                <p className="mt-3 text-sm text-slate-600">{item.address}</p>
                <div className="mt-4 flex gap-2">
                  <button type="button" className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-3 py-3 font-medium text-white hover:bg-indigo-500">
                    <Phone className="h-4 w-4" /> Call
                  </button>
                  <button type="button" className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-3 font-medium text-slate-700 hover:bg-slate-50">
                    <Navigation className="h-4 w-4" /> Directions
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="safe-card rounded-[28px] p-3 sm:p-4">
          <div className="map-shell relative h-[420px] rounded-[22px] border border-slate-200">
            <div className="absolute left-[36%] top-[22%] h-3 w-3 rounded-full bg-rose-500 shadow-[0_0_0_10px_rgba(239,68,68,0.1)]" />
            <div className="absolute left-[52%] top-[58%] h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_0_10px_rgba(16,185,129,0.1)]" />
            <div className="absolute left-[68%] top-[40%] h-3 w-3 rounded-full bg-amber-500 shadow-[0_0_0_10px_rgba(245,158,11,0.1)]" />
            <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/90 px-4 py-3 shadow-md ring-1 ring-slate-200 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Map view</p>
              <p className="mt-2 text-sm text-slate-700">Nearest active services: 3 within 2 km</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderRoute = () => (
    <div className="space-y-6">
      <div className="safe-card rounded-[28px] p-5 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-slate-500">Safe route</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">Plan a safer path</h2>
          </div>
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <label className="block text-sm font-medium text-slate-700">
            Starting location
            <input defaultValue="Current location" className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100" type="text" />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Destination
            <input defaultValue="Sector 18, New Delhi" className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100" type="text" />
          </label>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="safe-card rounded-[28px] p-3 sm:p-4">
          <div className="map-shell relative h-[420px] rounded-[22px] border border-slate-200">
            <div className="route-line left-[12%] top-[54%] w-[48%] rotate-[24deg]" />
            <div className="route-line left-[46%] top-[58%] w-[30%] rotate-[-10deg] opacity-70" style={{ background: 'linear-gradient(90deg, #10b981, #22c55e)' }} />
            <div className="absolute left-[26%] top-[48%] flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg ring-4 ring-indigo-100">
              <MapPinned className="h-4 w-4" />
            </div>
            <div className="absolute right-[18%] top-[42%] flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg ring-4 ring-emerald-100">
              <Navigation className="h-4 w-4" />
            </div>
            <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/90 px-4 py-3 shadow-md ring-1 ring-slate-200 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Route summary</p>
              <p className="mt-2 text-base font-semibold text-slate-900">Safer route • 24 min • 7.6 km</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {safeRouteOptions.map((route) => (
            <button key={route.id} type="button" onClick={() => setRouteSelection(route.id)} className={`safe-card flex w-full items-center justify-between rounded-[28px] p-4 text-left ${routeSelection === route.id ? 'ring-2 ring-indigo-200' : ''}`}>
              <div>
                <p className="text-lg font-semibold text-slate-900">{route.label}</p>
                <p className="text-sm text-slate-600">{route.detail}</p>
              </div>
              <div className={`rounded-full px-2.5 py-1 text-xs font-semibold ${route.safety === 'High' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                {route.safety}
              </div>
            </button>
          ))}

          <div className="safe-card rounded-[28px] p-4 text-sm text-slate-600">
            Route safety information depends on available data and should not be treated as a guarantee of safety.
          </div>
        </div>
      </div>
    </div>
  )

  const renderFakeCall = () => (
    <div className="space-y-6">
      {!fakeCallActive ? (
        <div className="safe-card rounded-[28px] p-5 sm:p-6">
          <p className="text-sm uppercase tracking-[0.22em] text-slate-500">Fake call</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">Create a safe exit</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="block text-sm font-medium text-slate-700">
              Caller name
              <select value={fakeCallName} onChange={(event) => setFakeCallName(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100">
                {fakeCallers.map((caller) => (
                  <option key={caller} value={caller}>{caller}</option>
                ))}
              </select>
            </label>

            <label className="block text-sm font-medium text-slate-700">
              Delay
              <select value={fakeCallDelay} onChange={(event) => setFakeCallDelay(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100">
                <option value="3 sec">3 sec</option>
                <option value="10 sec">10 sec</option>
                <option value="30 sec">30 sec</option>
              </select>
            </label>
          </div>

          <button type="button" onClick={handleFakeCallStart} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 font-semibold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500">
            <Phone className="h-4 w-4" /> Start fake call
          </button>
        </div>
      ) : (
        <div className="safe-card overflow-hidden rounded-[32px] bg-slate-950 text-white shadow-[0_30px_80px_rgba(15,23,42,0.24)]">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-sm font-semibold">{fakeCallName.slice(0, 1)}</div>
              <div>
                <p className="text-lg font-semibold">{fakeCallName}</p>
                <p className="text-xs uppercase tracking-[0.18em] text-slate-300">{channelStatus}</p>
              </div>
            </div>
            <button type="button" onClick={handleFakeCallEnd} className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white">Decline</button>
          </div>

          <div className="flex min-h-[420px] flex-col items-center justify-center px-6 py-8 text-center">
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white/10 text-4xl shadow-lg shadow-slate-900/50">{fakeCallName.slice(0, 1)}</div>
            <p className="text-4xl font-semibold">{fakeCallName}</p>
            <p className="mt-2 text-sm uppercase tracking-[0.3em] text-slate-400">Calling...</p>
            <div className="mt-10 flex gap-4">
              <button type="button" onClick={handleFakeCallEnd} className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-600 text-white shadow-lg shadow-rose-500/30">X</button>
              <button type="button" onClick={handleFakeCallEnd} className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30">✓</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  const renderIncident = () => (
    <div className="space-y-6">
      <div className="safe-card rounded-[28px] p-5 sm:p-6">
        <p className="text-sm uppercase tracking-[0.22em] text-slate-500">Incident report</p>
        <h2 className="mt-2 text-3xl font-bold text-slate-900">Report a safety incident</h2>
      </div>

      {!reportSubmitted ? (
        <form onSubmit={handleSubmitReport} className="safe-card rounded-[28px] p-5 sm:p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm font-medium text-slate-700 md:col-span-1">
              Incident type
              <select className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100" defaultValue="Harassment">
                {incidentOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </label>

            <label className="block text-sm font-medium text-slate-700 md:col-span-1">
              Date and time
              <input className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100" type="datetime-local" defaultValue="2026-08-15T18:30" />
            </label>

            <label className="block text-sm font-medium text-slate-700 md:col-span-2">
              Location
              <input className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100" type="text" placeholder="Enter current or reported location" defaultValue="Sector 18, New Delhi" />
            </label>

            <label className="block text-sm font-medium text-slate-700 md:col-span-2">
              Description
              <textarea className="mt-2 h-32 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100" placeholder="Describe what happened." defaultValue="I was followed after leaving the metro station and felt unsafe. A man continued to walk near me and tried to engage in conversation." />
            </label>

            <label className="block text-sm font-medium text-slate-700 md:col-span-2">
              Optional file attachment
              <input type="file" className="mt-2 block w-full rounded-xl border border-dashed border-slate-300 bg-slate-50 px-3 py-3 text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-100 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-indigo-700" />
            </label>
          </div>

          <div className="mt-6 flex items-center justify-between gap-3">
            <p className="text-sm text-slate-600">Your report remains private and is only visible to your trusted safety team.</p>
            <button type="submit" className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500">Submit report</button>
          </div>
        </form>
      ) : (
        <div className="safe-card rounded-[28px] p-8 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <Check className="h-10 w-10" />
          </div>
          <h3 className="mt-5 text-2xl font-bold text-slate-900">Your report has been submitted.</h3>
          <p className="mt-2 text-sm text-slate-600">We will keep your information private and refer it to the appropriate support flow.</p>
          <button type="button" onClick={() => setCurrentView('dashboard')} className="mt-5 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-500">Return to dashboard</button>
        </div>
      )}
    </div>
  )

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="safe-card rounded-[28px] p-5 sm:p-6">
        <p className="text-sm uppercase tracking-[0.22em] text-slate-500">Settings</p>
        <h2 className="mt-2 text-3xl font-bold text-slate-900">Account and safety controls</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {[
          { title: 'Profile', description: 'Manage your account details and emergency identity.', icon: <UserRound className="h-5 w-5" /> },
          { title: 'Emergency contacts', description: 'Review contact selection and primary contacts.', icon: <Users className="h-5 w-5" /> },
          { title: 'Location permissions', description: 'Control how your live location is shared.', icon: <MapPinned className="h-5 w-5" /> },
          { title: 'Notification preferences', description: 'Update SMS, email, and in-app alert settings.', icon: <Bell className="h-5 w-5" /> },
          { title: 'Privacy settings', description: 'Control who can see your data and route history.', icon: <Shield className="h-5 w-5" /> },
          { title: 'Security', description: 'Enable two-factor verification and device trust.', icon: <ShieldCheck className="h-5 w-5" /> },
          { title: 'Help & Support', description: 'Contact support and review safety guidance.', icon: <HelpCircle className="h-5 w-5" /> },
          { title: 'Logout', description: 'End your current session securely.', icon: <Moon className="h-5 w-5" /> },
        ].map((item) => (
          <button key={item.title} type="button" className="safe-card flex items-center justify-between rounded-[28px] p-4 text-left transition hover:-translate-y-0.5 hover:shadow-lg">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-700">{item.icon}</div>
              <div>
                <p className="text-lg font-semibold text-slate-900">{item.title}</p>
                <p className="text-sm text-slate-600">{item.description}</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-slate-400" />
          </button>
        ))}
      </div>
    </div>
  )

  const pageMap = {
    dashboard: renderDashboard(),
    contacts: renderContacts(),
    location: renderLocation(),
    help: renderHelp(),
    route: renderRoute(),
    'fake-call': renderFakeCall(),
    incident: renderIncident(),
    settings: renderSettings(),
  }

  if (!isLoggedIn) {
    return renderAuthView()
  }

  return (
    <div className="min-h-screen bg-[#f5f7fb] px-3 py-3 sm:px-4 lg:px-6">
      <div className="mx-auto max-w-7xl">
        {renderTopBar()}

        <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="hidden rounded-[30px] bg-white p-4 text-slate-900 ring-1 ring-slate-200 lg:block">
            <div className="mb-7 flex items-center gap-3 px-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700 ring-1 ring-indigo-200">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-lg font-semibold">SafeCircle</p>
                <p className="text-[10px] uppercase tracking-[0.22em] text-slate-500">Safety app</p>
              </div>
            </div>

            <nav className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCurrentView(item.id)}
                  className={`flex w-full items-center justify-between rounded-2xl px-3 py-3 text-left text-sm font-medium transition ${currentView === item.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              ))}
            </nav>

            <div className="mt-8 rounded-[24px] border border-rose-100 bg-rose-50 p-4">
              <div className="mb-2 flex items-center gap-2 text-rose-700"><Siren className="h-4 w-4" /> Emergency</div>
              <p className="text-sm text-slate-700">Keep your SOS button visible and ready for quick activation.</p>
            </div>
          </aside>

          <main className="pb-24 lg:pb-6">{pageMap[currentView]}</main>
        </div>

        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/90 px-3 py-2 shadow-[0_-8px_20px_rgba(15,23,42,0.06)] backdrop-blur-md lg:hidden">
          <div className="mx-auto grid max-w-xl grid-cols-4 gap-2">
            {['dashboard', 'location', 'help', 'settings'].map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => setCurrentView(id)}
                className={`rounded-2xl px-2 py-2 text-center text-[11px] font-medium ${currentView === id ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}
              >
                {id === 'dashboard' ? 'Home' : id === 'location' ? 'Location' : id === 'help' ? 'Help' : 'Settings'}
              </button>
            ))}
            <button type="button" onClick={() => setCurrentView('dashboard')} className="rounded-2xl bg-rose-600 px-2 py-2 text-[11px] font-semibold text-white shadow-lg shadow-rose-600/30">SOS</button>
          </div>
        </div>

        <footer className="pb-20 pt-6 text-center text-xs text-slate-500 lg:pb-4">
          © 2026 SafeCircle. Made by codeSerlox. Human-made safety platform for fast, reliable protection.
        </footer>
      </div>
    </div>
  )
}

export default App
