"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Edit2 } from "iconsax-react"
import AboutForm from "./about-form"
import { useAboutStatus } from "./use-about-status"
import { AboutData } from "@/types/about"
import { calculateAge } from "@/lib/calculationDate"
import { Badge } from "@/components/ui/badge"

interface ClientPageProps {
  dataAbout: AboutData
}

function ClientPage({ dataAbout }: ClientPageProps) {
  const { isEditAbout, setIsEditAbout } = useAboutStatus()
  return (
    <div>
      {!isEditAbout ? (
        <>
          <Card className="bg-main relative border-none overflow-hidden rounded-lg mb-4 text-white">
            <CardContent className="pl-4 pr-2">
              <div className="flex justify-between items-center mt-2">
                <p className="font-bold">About</p>
                <button onClick={() => setIsEditAbout(!isEditAbout)}>
                  <Edit2 className="absolute top-2 right-2 text-white" />
                </button>
              </div>
              {!dataAbout.name &&
              !dataAbout.birthday &&
              !dataAbout.horoscope &&
              !dataAbout.zodiac &&
              !dataAbout.height &&
              !dataAbout.weight &&
              dataAbout.interests.length === 0 ? (
                <p className="py-4 text-white text-opacity-[0.52]">
                  Add in your info to help others know you better
                </p>
              ) : (
                <div className="py-4">
                  <div className="flex items-center gap-2 mb-2">
                    <p>Birthday</p>
                    <p>
                      : {dataAbout.birthday} (Age {calculateAge(dataAbout.birthday)})
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <p>Horoscope</p>
                    <p>: {dataAbout.horoscope}</p>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <p>Zodiac</p>
                    <p>: {dataAbout.zodiac}</p>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <p>Height</p>
                    <p>: {dataAbout.height} cm</p>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <p>Weight</p>
                    <p>: {dataAbout.weight} kg</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      ) : (
        <AboutForm dataAbout={dataAbout} />
      )}

      <Card className="bg-main relative border-none overflow-hidden rounded-lg mb-4 text-white">
        <CardContent className="pl-4 pr-2 pb-4">
          <div className="flex justify-between mt-2 items-center">
            <p className="font-bold mb-4">Interest</p>

            <a href="/dashboard/edit_interest">
              <Edit2 className="absolute top-2 right-2 text-white" />
            </a>
          </div>

          {!dataAbout.interests.length ||
          (dataAbout.interests.length === 1 && dataAbout.interests[0] === "") ? (
            <p className="py-4 text-white text-opacity-[0.52]">
              Add in your info to help others know you better
            </p>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {dataAbout.interests.map((interest, index) => (
                <Badge key={index}>{interest}</Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default ClientPage
