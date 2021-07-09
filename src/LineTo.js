import LineTo from 'react-lineto';

export default function LineToExample() {
    const flexContainer = {
        display: 'flex',
        justifyContent: 'space-around'
    };
    return (
        <div>
        <div style={flexContainer}>
            <div className="A">Element A</div>
            <div className="B">Element B</div>
        </div>
        <LineTo from="A" to="B" />
        </div>
    );
}