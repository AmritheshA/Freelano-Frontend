import axiosInstance from "@/Config/AxiosConfig/axiosConfig";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { VirtualScroller, VirtualScrollerTemplateOptions, } from 'primereact/virtualscroller';
import { classNames } from 'primereact/utils';
import { debounce } from 'lodash';


export default function AddSkills({ onSkillChange, flag }: any) {
    const [inputValue, setInputValue] = useState("");
    const [results, setResults] = useState([]);
    const divRef = useRef<HTMLDivElement>(null);


    const handleClickOutside = (event: MouseEvent) => {
        if (divRef.current && !divRef.current.contains(event.target as Node)) {
            setResults([]);
        }
    };
    useEffect(() => {
        // Add event listener when component mounts
        document.addEventListener('click', handleClickOutside);

        // Cleanup event listener when component unmounts
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const fetchSkills = debounce(async (value: string) => {
        try {
            const response = await axiosInstance.get(`/api/v1/user/fetchSkills?searchValue=${value}`);
            const result = response.data;
            if (value)
                setResults(result);
            else
                setResults([])
        } catch (error) {
            console.error("Error fetching skills:", error);
            setResults([]);
        }
    }, 1000);

    const handleInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value);
        await fetchSkills(value);

    };

    const itemTemplate = (item: string, options: VirtualScrollerTemplateOptions) => {
        const className = classNames('flex cursor-pointer mt-5 sm:w-[90%] max-w-[700px] items-center rounded-md hover:bg-slate-300  align-items-center p-2', {
            'surface-hover': options.odd
        });

        return (
            <div className={className} onClick={() => { setInputValue(item); onSkillChange(item); }} style={{ height: options.props.itemSize + 'px' }}>
                {item}
            </div>
        );
    };

    return (
        <>
            {flag ?
                <div>
                    < Input
                        value={inputValue}
                        onChange={handleInputChange}
                        className="border-2 text-black tracking-wide w-[200px] items-center font-semibold freelancerFont border-gray-300 rounded-md py-2 px-4 sm:w-[50%] max-w-[700px] focus:outline-none focus:border-gray-400"
                        placeholder="Select Your Skills"
                    />
                    <div className="card justify-content-center relative items-center sm:w-[50%] max-w-[700px] overlay top-0 bg-background left-0" ref={divRef}>
                        {results.length > 0 ? (
                            <VirtualScroller items={results} itemSize={50} itemTemplate={itemTemplate} className="border-1  max-w-[700px] w-[700px] sm:w-[700px] h-[200px] surface-border border-round" />
                        ) : (
                            <></>
                        )}

                    </div>
                </div > :
                <div className="relative">
                    < Input
                        value={inputValue}
                        onChange={handleInputChange}
                        className="border-2 text-black tracking-wide w-[300px] items-center font-semibold freelancerFont  border-gray-300 rounded-md py-2 px-4 sm:w-full max-w-[500px] focus:outline-none focus:border-gray-400"
                        placeholder="Select Your Skills"
                    />
                    <div className="card justify-content-center absolute items-center sm:w-[50%] max-w-[300px]  top-10 bg-background z-10 left-0" ref={divRef}>
                        {results.length > 0 ? (
                            <VirtualScroller items={results} itemSize={50} itemTemplate={itemTemplate} className="border-1  max-w-[500px] w-[300px] sm:w-[300px] h-[200px] surface-border border-round" />
                        ) : (
                            <></>
                        )}

                    </div>
                </div >
            }

        </>
    );
}
