import React from "react";

// ---- Components ----
import type { InputField } from "../../entities/Field";

// ---- Icons ----
import { GoEyeClosed } from "react-icons/go";
import { RxEyeOpen } from "react-icons/rx";

const InputFieldComponent: React.FC<InputField> = ({
    label,
    value,
    onChange,

    type = "text",
    placeholder,
    error,

    showButton = false,
    show = false,
    onToggleShow
}) => {
    return (
        <div className="flex flex-col mb-4">
            <label className="text-sm font-montserrat-bold text-emerald-700 uppercase tracking-wide p-2">{label}</label>

            {/* make this container relative so child button can position absolutely */}
            <div className="relative w-full">
                <input
                    className={`h-12 w-full px-4 py-3 pr-10 rounded-lg border-2 font-montserrat transition-all duration-300 ${
                        error
                            ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                            : 'border-emerald-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200'
                    }`}
                    type={showButton && show ? "text" : type}               // toggle text vs. password
                    value={value}
                    placeholder={placeholder}
                    onChange={(e) => onChange(e.target.value)}
                />

                {showButton && (
                    <button
                        type="button"
                        onClick={onToggleShow}
                        className="absolute inset-y-0 right-3 flex items-center justify-center cursor-pointer text-emerald-600 hover:text-emerald-700 transition-colors duration-200"
                    >
                        {show ? <RxEyeOpen size={20} /> : <GoEyeClosed size={20} />}
                    </button>
                )}
            </div>

            {error && <span className="text-red-600 text-sm font-montserrat mt-1">{error}</span>}
        </div>
    );
};

export default InputFieldComponent;
