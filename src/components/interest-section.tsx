import { Badge } from "@/components/ui/badge"
import { PencilLine } from "lucide-react"

interface InterestSectionProps {
  interests?: string[]
  onEdit?: () => void
}

export function InterestSection({
  interests = ["Music", "Basketball", "Fitness", "Gymming"],
  onEdit
}: InterestSectionProps) {
  return (
    <div className="p-4 bg-main text-white rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Interest</h2>
        <button onClick={onEdit} className="text-white/80 hover:text-white transition-colors">
          <PencilLine className="h-6 w-6" />
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        {interests.map((interest) => (
          <Badge key={interest} variant="interest">
            {interest}
          </Badge>
        ))}
      </div>
    </div>
  )
}
