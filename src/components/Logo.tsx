import { GraduationCap } from 'lucide-react'

export default function Logo() {
  return (
    <div className="flex items-center space-x-1">
      <GraduationCap className="h-8 w-8 text-white" />
      <span className="text-2xl text-white">
        <span className="font-black">Tutor</span>
        <span className="font-medium">Plan</span>
      </span>
    </div>
  )
}
