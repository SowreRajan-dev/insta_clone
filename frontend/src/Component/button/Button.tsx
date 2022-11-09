import "./button.css"
interface Props { 
    label: string;
    primary?:boolean;
}
function Button({ label,primary }: Props) {
    if (primary) {

        return (
            <div className="button primary-btn hoverable">{label}</div>
        )
    } else {
        return (
            <div className="button secondary-btn hoverable">{label}</div>
        )
    
    }
}

export default Button