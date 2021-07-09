import { SteppedLineTo } from 'react-lineto';

export default function SteppedLineToComponent() {
    return (
        <div>
            <div className="A">Element A</div>
            <div className="B">Element B</div>
            <SteppedLineTo from="A" to="B" orientation="v" />
        </div>
    );
}