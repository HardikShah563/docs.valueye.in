import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { DateRange } from "react-day-picker"

export function DatePickerWithRange({
    dateRange,
    setDateRange,
    className,
}: {
    dateRange: DateRange | undefined
    setDateRange: (range: DateRange | undefined) => void
    className?: string
}) {
    const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const from = e.target.value ? new Date(e.target.value) : undefined
        setDateRange({
            from,
            to: dateRange?.to
        })
    }

    const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const to = e.target.value ? new Date(e.target.value) : undefined
        setDateRange({
            from: dateRange?.from,
            to
        })
    }

    // Convert Date objects to ISO string (YYYY-MM-DD) for input[type="date"]
    const fromValue = dateRange?.from?.toISOString().split('T')[0] || ''
    const toValue = dateRange?.to?.toISOString().split('T')[0] || ''

    return (
        <div className={cn("grid gap-4", className)}>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="from-date">From</Label>
                    <Input
                        id="from-date"
                        type="date"
                        value={fromValue}
                        onChange={handleFromChange}
                        max={toValue} // Can't select "from" date after "to" date
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="to-date">To</Label>
                    <Input
                        id="to-date"
                        type="date"
                        value={toValue}
                        onChange={handleToChange}
                        min={fromValue} // Can't select "to" date before "from" date
                    />
                </div>
            </div>
        </div>
    )
}