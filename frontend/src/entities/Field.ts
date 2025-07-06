export interface InputField {
    // ---- Input field properties ----
    label: string
    value: string
    onChange: (value: string) => void

    // ---- Optional properties ----
    type?: string
    placeholder?: string
    error?: string

    // ---- Show/hide button properties ----
    showButton?: boolean
    show?: boolean
    onToggleShow?: () => void
}