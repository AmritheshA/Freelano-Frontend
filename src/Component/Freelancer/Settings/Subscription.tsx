import { Button } from '@mui/material';

const Subscription = () => {
    return (
        <>
            <div className="bg-background py-16">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-3">
                        Pricing & Plans
                    </h2>
                    <p className="text-lg text-gray-500 text-center mb-12">
                        Subscription enable more effecient job finding and Trust between client and freelancer <br /> Choose your plan based on your prefeerence
                    </p>
                </div>
            </div>

            <div className="flex justify-center gap-8">
                {/* Standard Plan */}
                <div className="bg-slate-100 w-[300px] shadow-xl rounded-lg  p-6 max-w-xs hover:bg-blue-100 transition-colors duration-300">
                    <h3 className="text-xl font-semibold mb-4">Free Plan </h3>
                    <p className="text-4xl font-bold mb-4">$0</p>
                    <p className="text-gray-500 mb-6">For personal</p>
                    <ul className="mb-6">
                        <li className="flex items-center mb-2">
                            <svg className="w-5 h-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>Just Matches Jobs </span>
                        </li>
                        <li className="flex items-center mb-2">
                            <svg className="w-5 h-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>Limited Clients</span>
                        </li>
                        <li className="flex items-center mb-2 gap-4">
                            <svg stroke="currentColor" className='w-3 h-3' fill="currentColor" stroke-width="0" version="1.1" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M15.854 12.854c-0-0-0-0-0-0l-4.854-4.854 4.854-4.854c0-0 0-0 0-0 0.052-0.052 0.090-0.113 0.114-0.178 0.066-0.178 0.028-0.386-0.114-0.529l-2.293-2.293c-0.143-0.143-0.351-0.181-0.529-0.114-0.065 0.024-0.126 0.062-0.178 0.114 0 0-0 0-0 0l-4.854 4.854-4.854-4.854c-0-0-0-0-0-0-0.052-0.052-0.113-0.090-0.178-0.114-0.178-0.066-0.386-0.029-0.529 0.114l-2.293 2.293c-0.143 0.143-0.181 0.351-0.114 0.529 0.024 0.065 0.062 0.126 0.114 0.178 0 0 0 0 0 0l4.854 4.854-4.854 4.854c-0 0-0 0-0 0-0.052 0.052-0.090 0.113-0.114 0.178-0.066 0.178-0.029 0.386 0.114 0.529l2.293 2.293c0.143 0.143 0.351 0.181 0.529 0.114 0.065-0.024 0.126-0.062 0.178-0.114 0-0 0-0 0-0l4.854-4.854 4.854 4.854c0 0 0 0 0 0 0.052 0.052 0.113 0.090 0.178 0.114 0.178 0.066 0.386 0.029 0.529-0.114l2.293-2.293c0.143-0.143 0.181-0.351 0.114-0.529-0.024-0.065-0.062-0.126-0.114-0.178z"></path></svg>
                            <span>No Support</span>
                        </li>
                    </ul>
                    <Button disabled={true} variant='outlined' color='info' className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300">
                        Subscribed
                    </Button>
                </div>

                {/* Professional Plan */}
                <div className="bg-slate-100 w-[300px] shadow-xl rounded-lg  p-6 max-w-xs hover:bg-blue-100 transition-colors duration-300">
                    <h3 className="text-xl font-semibold mb-4">Basic Plan</h3>
                    <p className="text-4xl font-bold mb-4">$29/yr</p>
                    <p className="text-gray-500 mb-6">For personal </p>
                    <ul className="mb-6">
                        <li className="flex items-center mb-2">
                            <svg className="w-5 h-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>5x Job Matches</span>
                        </li>
                        <li className="flex items-center mb-2">
                            <svg className="w-5 h-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>Ulimited Clients</span>
                        </li>
                        <li className="flex items-center mb-2">
                            <svg className="w-5 h-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>24x7 Support</span>
                        </li>

                    </ul>
                    <button className="bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 transition-colors duration-300">
                        Get full access
                    </button>
                    <p className="text-gray-500 mt-4">7 Days Moneyback Guarantee</p>
                </div>

                {/* Exclusive Plan */}
                <div className="bg-slate-100 w-[300px] shadow-xl rounded-lg  p-6 max-w-xs hover:bg-blue-100 transition-colors duration-300">
                    <h3 className="text-xl font-semibold mb-4">Pro Plan</h3>
                    <p className="text-4xl font-bold mb-4">$49/yr</p>
                    <p className="text-gray-500 mb-6">For Enterprise</p>
                    <ul className="mb-6">
                        <li className="flex items-center mb-2">
                            <svg className="w-5 h-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>10x Job Matches</span>
                        </li>
                        <li className="flex items-center mb-2">
                            <svg className="w-5 h-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>Ulimited Clients</span>
                        </li>
                        <li className="flex items-center mb-2">
                            <svg className="w-5 h-5 text-green-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>24x7 Support</span>
                        </li>
                    </ul>
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300">
                        Get full access
                    </button>
                    <p className="text-gray-500 mt-4">7 Days Moneyback Guarantee</p>
                </div>
            </div>
        </>
    );
};

export default Subscription;