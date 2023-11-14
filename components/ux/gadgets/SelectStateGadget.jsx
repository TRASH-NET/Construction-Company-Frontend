

const SelectStateGadget = () => {
    return (
        <>
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="light">In Maintenance</SelectItem>
                    <SelectItem value="dark">Available</SelectItem>
                </SelectContent>
            </Select>
        </>
    )
}

export default SelectStateGadget