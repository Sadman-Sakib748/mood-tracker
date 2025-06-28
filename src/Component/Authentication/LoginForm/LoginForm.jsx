import { Phone, Lock } from "lucide-react";
import SubmitButton from "../SubmitButton/SubmitButton";
import FormField from "../FormField/FormField";


const LoginForm = ({ loginData, setLoginData, handleLogin, isLoading }) => {
    return (
        <form onSubmit={handleLogin} className="space-y-4">
            <FormField
                icon={<Phone className="h-5 w-5 text-gray-400" />}
                id="login-phone"
                type="tel"
                placeholder="Enter your phone number"
                value={loginData.phone}
                onChange={(e) => setLoginData({ ...loginData, phone: e.target.value })}
                label="Phone Number"
            />
            <FormField
                icon={<Lock className="h-5 w-5 text-gray-400" />}
                id="login-password"
                type="password"
                placeholder="Enter your password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                label="Password"
            />
            <SubmitButton isLoading={isLoading} text="Sign In" loadingText="Signing in..." />
        </form>
    );
}


export default LoginForm;