import "./button.css"
interface Props { 
    label: string;
    primary?: boolean;
}
function Button({ label,primary }: Props) {
    if (primary) {

        return (
            <button className="button primary-btn hoverable">{label}</button>
        )
    } else {
        return (
            <button className="button secondary-btn hoverable">{label}</button>
        )
    
    }
}

export default Button