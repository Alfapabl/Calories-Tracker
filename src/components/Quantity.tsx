

type QuantityProps = {
    Calories: number,
    activity : string
}

export default function Quantity({Calories, activity} : QuantityProps) {
  return (
    <p className="text-white font-bold rounded-full grid  gap-3 text-center">
    <span className="font-black text-6xl">{Calories}</span>
    {activity}
  </p>
  )
}
