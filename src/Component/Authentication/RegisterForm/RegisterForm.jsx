const RegisterForm = ({
  registerData,
  setRegisterData,
  handleRegister,
  isLoading,
}) => {
  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">Name</label>
        <input
          type="text"
          value={registerData.name}
          onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
          className="w-full border px-3 py-2 rounded-md"
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Phone</label>
        <input
          type="tel"
          value={registerData.phone}
          onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
          className="w-full border px-3 py-2 rounded-md"
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Password</label>
        <input
          type="password"
          value={registerData.password}
          onChange={(e) =>
            setRegisterData({ ...registerData, password: e.target.value })
          }
          className="w-full border px-3 py-2 rounded-md"
          required
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Confirm Password</label>
        <input
          type="password"
          value={registerData.confirmPassword}
          onChange={(e) =>
            setRegisterData({ ...registerData, confirmPassword: e.target.value })
          }
          className="w-full border px-3 py-2 rounded-md"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
        disabled={isLoading}
      >
        {isLoading ? "Registering..." : "Register"}
      </button>
    </form>
  );
};

export default RegisterForm;
