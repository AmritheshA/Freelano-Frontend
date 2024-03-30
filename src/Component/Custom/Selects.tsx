import React from 'react';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export interface SelectOption {
    label: string;
    value: string ;
}

interface SelectProps {
    options: SelectOption[];
    value: string | number;
    onChange: (value: string) => void;
    className?: string;
    isDisabled: boolean;
}

export const Selects: React.FC<SelectProps> = ({ options, value, onChange, className, isDisabled }) => {

    return (

        <Select disabled={isDisabled}  onValueChange={onChange} >
            <SelectTrigger className={className}>
                <SelectValue placeholder={value} />
            </SelectTrigger>
            <SelectContent>
                {options.map(option => (
                    <SelectItem value={(option.value) as (string)}>{option.label}</SelectItem>
                ))}

            </SelectContent>
        </Select>

        // <select
        //     disabled={isDisabled}
        //     className={className}
        //     value={value}
        //     onChange={(e) => onChange(e.target.value)}
        // >
        //     {options.map(option => (
        //         <option key={option.value} value={option.value}>
        //             {option.label}
        //         </option>
        //     ))}
        // </select>
    );
};


