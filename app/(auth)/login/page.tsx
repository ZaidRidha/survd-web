import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
        <p className="text-gray-600">Sign in to your Survd account</p>
      </div>

      <form className="space-y-5">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition text-gray-900 bg-gray-50"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent transition text-gray-900 bg-gray-50"
            placeholder="••••••••"
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center text-gray-700">
            <input type="checkbox" className="mr-2 accent-primary" />
            Remember me
          </label>
          <Link href="/forgot-password" className="text-primary hover:text-primary/80 font-medium">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg transition shadow-sm"
        >
          Sign In
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-6">
        Don&apos;t have an account?{' '}
        <Link href="/signup" className="text-primary hover:text-primary/80 font-medium">
          Sign up
        </Link>
      </p>
    </div>
  );
}
