<template>
    <div class="flex flex-col">
        <div class="min-h-[450px] bg-cover bg-center bg-[url('https://wp.xpeedstudio.com/electionify/wp-content/uploads/2019/12/about-banner.jpg')]">
            <div class="inset-0 min-h-[450px] bg-black bg-opacity-50">
                <div class="min-h-[450px] mx-auto desktop:w-[1200px] max-sm:w-full desktop:px-0 flex justify-center items-center">
                    <div class="flex flex-col gap-4 text-white">
                        <span class="font-bold text-5xl">About Us</span>
                        <span class="text-center font-bold">Home / About Us</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-cover bg-center bg-[url('https://wp.xpeedstudio.com/electionify/wp-content/uploads/2019/12/campaign-right-banner.png')]">
            <div class="bg-white bg-opacity-90">
                <div class="mx-auto desktop:w-[1200px] py-10 max-sm:w-full desktop:px-0 ">
                    <div class="flex flex-col justify-center gap-6">
                        <div class="text-center flex flex-col gap-4 justify-center items-center">
                            <div class="flex flex-col">
                                <span class="text-blue-500 font-bold">Our Team Members</span>
                                <span class="font-bold text-4xl text-blue-900">NextGenVote Members</span>
                            </div>
                            <span class="font-semiboldbold w-2/3 text-center text-gray-600 font-semibold">Single-Member Limited Liability Company.</span>
                        </div>
                        <div class="flex justify-center">
                            <div class="w-[400px]">
                                <!-- Sửa lớp img: thêm grayscale và hover:grayscale-0 để chuyển từ trắng đen sang màu khi hover -->
                                <img class="w-full h-[450px] rounded-lg object-cover" src="/src/assets/images/HomePage/owner1.jpg" alt="">
                                <div class="flex flex-col p-4 gap-4">
                                    <div class="flex flex-col justify-center gap-2">
                                        <span class="flex justify-center font-bold text-blue-900 text-2xl">Ho Quang Dat</span>
                                        <span class="flex justify-center font-semibold text-gray-700 text-sm">Developer / Tester / PM</span>
                                        <div class="flex justify-center gap-1 text-white">
                                            <div class="p-2 w-[30px] h-[30px] flex justify-center items-center bg-blue-900 cursor-pointer hover:bg-blue-600 duration-300"> 
                                                <i class="fa-brands fa-facebook-f"></i>
                                            </div>
                                            <div class="p-2 w-[30px] h-[30px] flex justify-center items-center bg-blue-900 cursor-pointer hover:bg-blue-600 duration-300"> 
                                                <i class="fa-brands fa-twitter"></i>
                                            </div>
                                            <div class="p-2 w-[30px] h-[30px] flex justify-center items-center bg-blue-900 cursor-pointer hover:bg-blue-600 duration-300"> 
                                                <i class="fa-brands fa-linkedin-in"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="bg-cover bg-center bg-[url('https://wp.xpeedstudio.com/electionify/wp-content/uploads/2019/12/our-priorities-bg-min.jpg')]">
            <div class="bg-white bg-opacity-90">
                <div class="mx-auto desktop:w-[1200px] py-10 max-sm:w-full desktop:px-0 ">
                    <div class="flex flex-col justify-center py-10 gap-6">
                        <div class="text-center flex flex-col gap-2 justify-center items-center">
                            <div class="flex flex-col">
                                <span class="text-blue-500 font-bold">Know more about</span>
                                <span class="font-bold text-4xl text-blue-900">Our Priorities</span>
                            </div>
                            <span class="font-semiboldbold w-2/3 text-center text-gray-600 font-semibold">With blockchain technology, we will ensure transparency and fairness in elections.</span>
                        </div>
                        <div class="grid grid-cols-3 gap-4">
                            <div class="bg-white rounded-lg shadow-lg">
                                <!-- Sửa lớp img: thêm grayscale và hover:grayscale-0 để chuyển từ trắng đen sang màu khi hover -->
                                <img class="w-full h-[250px] rounded-t-lg object-cover" src="/src/assets/images/HomePage/secure.webp" alt="">
                                <div class="flex flex-col p-8 gap-4">
                                    <span class="font-bold text-blue-900 text-2xl">Secure Voting</span>
                                    <span class="text-md text-gray-500">Ballot data is encrypted and stored on the blockchain, preventing tampering and manipulation.</span>
                                </div>
                            </div>
        
                            <div class="bg-white rounded-lg shadow-lg">
                                <!-- Sửa lớp img: thêm grayscale và hover:grayscale-0 để chuyển từ trắng đen sang màu khi hover -->
                                <img class="w-full h-[250px] rounded-t-lg object-cover" src="/src/assets/images/HomePage/reliability.webp" alt="">
                                <div class="flex flex-col p-8 gap-4">
                                    <span class="font-bold text-blue-900 text-2xl">Transparency and Reliability</span>
                                    <span class="text-md text-gray-500">Every step of the voting process is recorded on the blockchain, allowing easy verification and auditing.</span>
                                </div>
                            </div>
        
                            <div class="bg-white rounded-lg shadow-lg">
                                <!-- Sửa lớp img: thêm grayscale và hover:grayscale-0 để chuyển từ trắng đen sang màu khi hover -->
                                <img class="w-full h-[250px] rounded-t-lg object-cover" src="/src/assets/images/HomePage/user-friendly.webp" alt="">
                                <div class="flex flex-col p-8 gap-4">
                                    <span class="font-bold text-blue-900 text-2xl">User-Friendly</span>
                                    <span class="text-md text-gray-500"> A user-friendly and intuitive interface enables everyone to participate in the voting process easily and conveniently.</span>
                                </div>
                            </div>
                        </div>
                    </div>
        
                </div>
            </div>
        </div>
        
    </div>

</template>