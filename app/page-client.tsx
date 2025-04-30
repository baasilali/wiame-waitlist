"use client"

import Image from "next/image"
import WaitlistForm from "@/components/waitlist-form"
import { GooeyFilter } from "@/components/ui/gooey-filter"
import { PixelTrail } from "@/components/ui/pixel-trail"
import { useScreenSize } from "@/hooks/use-screen-size"

export default function HomeClient() {
  const screenSize = useScreenSize()
  const pixelSize = screenSize.lessThan("md") ? 24 : 32

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.aiscribbles.com/34fe5695dbc942628e3cad9744e8ae13.png?v=60d084"
          alt="Colorful impressionist painting of flowers"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Gooey Filter */}
      <GooeyFilter id="gooey-filter-pixel-trail" strength={5} />

      {/* Pixel Trail with Gooey Effect */}
      <div className="absolute inset-0 z-10" style={{ filter: "url(#gooey-filter-pixel-trail)" }}>
        <PixelTrail pixelSize={pixelSize} delay={200} pixelClassName="bg-white" />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-3xl mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-giaza text-white mb-6 drop-shadow-lg">Wiame</h1>
        <div className="mb-6">
          <p className="text-2xl md:text-3xl font-giaza text-white mb-2 drop-shadow-lg italic" dir="rtl">
            فَٱصْبِرْ صَبْرٗا جَمِيلٗا
          </p>
          <p className="text-lg md:text-xl font-giaza text-white/80 drop-shadow-md italic">
            So be patient — with beautiful patience. 70:5
          </p>
        </div>
        <p className="text-xl md:text-2xl font-giaza text-white mb-8 drop-shadow-md">
          Join our newsletter for drops, pop-ups, and info.
        </p>

        <WaitlistForm />
      </div>
    </main>
  )
}
