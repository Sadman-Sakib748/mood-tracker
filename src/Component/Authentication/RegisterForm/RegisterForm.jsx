import { Phone, Lock } from "lucide-react";
import FormField from "../FormField/FormField";
import SubmitButton from "../SubmitButton/SubmitButton";
const RegisterForm = ({ registerData, setRegisterData, handleRegister, isLoading }) => {
    return (
        <form onSubmit={handleRegister} className="space-y-4">
            <FormField
                icon={<Lock className="h-5 w-5 text-gray-400" />}
                id="register-name"
                type="text"
                placeholder="Enter your full name"
                value={registerData.name}
                onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                label="Full Name"
            />
            <FormField
                icon={<Phone className="h-5 w-5 text-gray-400" />}
                id="register-phone"
                type="tel"
                placeholder="Enter your phone number"
                value={registerData.phone}
                onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                label="Phone Number"
            />
            <FormField
                icon={<Lock className="h-5 w-5 text-gray-400" />}
                id="register-password"
                type="password"
                placeholder="Create a password"
                value={registerData.password}
                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                label="Password"
            />
            <FormField
                icon={<Lock className="h-5 w-5 text-gray-400" />}
                id="register-confirm"
                type="password"
                placeholder="Confirm your password"
                value={registerData.confirmPassword}
                onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                label="Confirm Password"
            />
            <SubmitButton isLoading={isLoading} text="Create Account" loadingText="Creating Account..." />
        </form>
    );
};

export default RegisterForm;