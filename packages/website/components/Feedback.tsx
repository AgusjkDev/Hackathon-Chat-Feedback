interface FeedbackProps {
    feedback: ProjectFeedback;
}

export default function Feedback({ feedback }: FeedbackProps) {
    const { total, positive, negative, neutral } = feedback;

    const positivePercentaje = total > 0 ? ((positive / total) * 100).toFixed(2) : 33.33;
    const negativePercentaje = total > 0 ? ((negative / total) * 100).toFixed(2) : 33.33;
    const neutralPercentaje = total > 0 ? ((neutral / total) * 100).toFixed(2) : 33.33;

    return (
        <div className="flex flex-col gap-3">
            <span className="text-center text-sm font-medium">{`${total} ${
                total !== 1 ? "mensajes analizados" : "mensaje analizado"
            }`}</span>

            <div className="flex h-8 w-full">
                <div style={{ width: `${positivePercentaje}%` }} className="h-full bg-positive" />
                <div style={{ width: `${neutralPercentaje}%` }} className="h-full bg-neutral" />
                <div style={{ width: `${negativePercentaje}%` }} className="h-full bg-negative" />
            </div>

            <ul className="flex w-full list-disc justify-evenly text-sm font-medium">
                <li className="text-positive-dark">{`${positivePercentaje}% (${positive})`}</li>
                <li className="text-neutral-dark">{`${neutralPercentaje}% (${neutral})`}</li>
                <li className="text-negative-dark">{`${negativePercentaje}% (${negative})`}</li>
            </ul>
        </div>
    );
}
