const LoginForm = ({ loginData, setLoginData, handleLogin, isLoading }) => {
  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">Phone</label>
        <input
          type="tel"
          value={loginData.phone}
          onChange={(e) => setLoginData({ ...loginData, phone: e.target.value })}
          className="w-full border px-3 py-2 rounded-md"
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Password</label>
        <input
          type="password"
          value={loginData.password}
          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
          className="w-full border px-3 py-2 rounded-md"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
        disabled={isLoading}
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
