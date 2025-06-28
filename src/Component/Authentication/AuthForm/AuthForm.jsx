import { useState } from "react";
import { Calendar, Phone, Lock } from "lucide-react";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";
const AuthForm = ({ onLogin }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("login");
    const [loginData, setLoginData] = useState({ phone: "", password: "" });
    const [registerData, setRegisterData] = useState({
        name: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            const users = JSON.parse(localStorage.getItem("mood-tracker-users") || "[]");
            const user = users.find(u => u.phone === loginData.phone && u.password === loginData.password);

            if (user) {
                onLogin(user);
            } else {
                alert("Invalid credentials");
            }
            setIsLoading(false);
        }, 1000);
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (registerData.password !== registerData.confirmPassword) {
            alert("Passwords don't match");
            return;
        }

        setIsLoading(true);

        setTimeout(() => {
            const users = JSON.parse(localStorage.getItem("mood-tracker-users") || "[]");

            if (users.find(u => u.phone === registerData.phone)) {
                alert("Phone number already registered");
                setIsLoading(false);
                return;
            }

            const newUser = {
                id: Date.now().toString(),
                name: registerData.name,
                phone: registerData.phone,
                password: registerData.password,
            };

            users.push(newUser);
            localStorage.setItem("mood-tracker-users", JSON.stringify(users));
            onLogin(newUser);
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Calendar className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">Mood Tracker</h1>
                    <p className="text-gray-600 mt-2">Track your daily emotions and build healthy habits</p>
                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="flex border-b">
                        <button
                            onClick={() => setActiveTab("login")}
                            className={`flex-1 py-4 px-1 text-center font-medium text-sm ${activeTab === "login" ? "text-indigo-600 border-b-2 border-indigo-500" : "text-gray-500"
                                }`}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => setActiveTab("register")}
                            className={`flex-1 py-4 px-1 text-center font-medium text-sm ${activeTab === "register" ? "text-indigo-600 border-b-2 border-indigo-500" : "text-gray-500"
                                }`}
                        >
                            Register
                        </button>
                    </div>

                    <div className="p-6">
                        {activeTab === "login" ? (
                            <LoginForm
                                loginData={loginData}
                                setLoginData={setLoginData}
                                handleLogin={handleLogin}
                                isLoading={isLoading}
                            />
                        ) : (
                            <RegisterForm
                                registerData={registerData}
                                setRegisterData={setRegisterData}
                                handleRegister={handleRegister}
                                isLoading={isLoading}
                            />
                        )}
                    </div>
                </div>

                <div className="mt-6 text-center text-sm text-gray-600">
                    <p>Demo credentials: Phone: 1234567890, Password: demo123</p>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;