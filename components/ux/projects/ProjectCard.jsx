import * as React from "react"

import {
    Card,
} from "@/components/ui/card"


export function ProjectCard({ children }) {
    return (
        <Card className="w-[360px] group hover:opacity-100 shadow-md max-h-[280px]">
            {children}
        </Card>
    )
}