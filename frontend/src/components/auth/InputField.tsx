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
            <label className="text-xl font-bold p-2">{label}</label>

            {/* make this container relative so child button can position absolutely */}
            <div className="relative w-full">
                <input
                    className="h-12 w-xl border-1 rounded-xl p-2 pr-10"  // extra right padding
                    type={showButton && show ? "text" : type}               // toggle text vs. password
                    value={value}
                    placeholder={placeholder}
                    onChange={(e) => onChange(e.target.value)}
                />

                {showButton && (
                    <button
                        type="button"
                        onClick={onToggleShow}
                        className="absolute inset-y-0 right-2 flex items-center justify-center cursor-pointer"
                    >
                        {show ? <RxEyeOpen size={20} /> : <GoEyeClosed size={20} />}
                    </button>
                )}
            </div>

            {error && <span className="text-red-600 mt-1">{error}</span>}
        </div>
    );
};

export default InputFieldComponent;
