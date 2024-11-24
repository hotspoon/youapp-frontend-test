"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MobileNav } from "@/components/mobile-nav"
import { useValues } from "@/app/(main)/dashboard/edit_interest/use-value"

interface InterestInputProps {
  onSave?: () => void
  defaultInterests?: string[]
}

export function InterestInput({ onSave, defaultInterests = [] }: InterestInputProps) {
  const { setValuesEdit, valuesEdit: interests } = useValues()
  //   const [interests, setInterests] = useState<string[]>(defaultInterests)
  const [inputValue, setInputValue] = useState("")

  useEffect(() => {
    setValuesEdit(defaultInterests)
  }, [defaultInterests])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault()
      if (!interests.includes(inputValue.trim())) {
        setValuesEdit([...interests, inputValue.trim()])
      }
      setInputValue("")
    }
  }

  const removeInterest = (interestToRemove: string) => {
    setValuesEdit(interests.filter((interest) => interest !== interestToRemove))
  }

  const handleSave = () => {
    if (onSave) {
      onSave()
    }
  }

  return (
    <div className="text-white">
      <MobileNav showBackButton className="border-none bg-transparent" title="">
        <Button
          onClick={handleSave}
          variant="ghost"
          className="ml-auto text-[#4C9EEB] hover:text-[#4C9EEB]/80 hover:bg-transparent"
        >
          Save
        </Button>
      </MobileNav>

      <div className="px-4 pt-16">
        <div className="mb-6">
          <h1 className="bg-gradient-to-r from-gold via-white to-yellow-200 inline-block text-transparent bg-clip-text">
            Tell everyone about yourself
          </h1>
          <h1 className="text-2xl font-bold">What interest you?</h1>
        </div>

        <div className="relative">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-[#1E2A31] border-none text-white placeholder:text-gray-500"
            placeholder="Type and press enter to add interests"
          />
          {/* bg gray blur */}

          <div className="mt-4 flex flex-wrap gap-2 backdrop-blur-sm">
            {interests.map((interest) => (
              <div
                key={interest}
                className="flex items-center gap-1 rounded-full bg-[#1E2A31]/60 px-4 py-2 backdrop-blur-sm"
              >
                <span className="capitalize">{interest}</span>
                <button
                  onClick={() => removeInterest(interest)}
                  className="ml-1 rounded-full p-0.5 hover:bg-white/10"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
