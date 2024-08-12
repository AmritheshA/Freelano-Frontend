import { MessageContext, messageType } from "@/Context/MessageContext/MessageProvider";
import { RootState } from "@/Redux/Store";
import { useContext, useEffect, useRef, useState } from "react";
import { FiSend } from "react-icons/fi";
import { useSelector } from "react-redux";
import toast, { Toaster } from 'react-hot-toast';
import { Check, CheckCheck, Smile } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'


function Messages() {

    const { sendMessage, receivedMessages, contactId, contacts } = useContext(MessageContext);
    const { user } = useSelector((state: RootState) => state.userDetails);
    const [textInput, setTextInput] = useState("");
    const scrollableElementRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        const scrollableElement = scrollableElementRef.current;
        if (scrollableElement) {
            scrollableElement.scrollTop = scrollableElement.scrollHeight;
        }
    });

    return (
        <>
            {(receivedMessages != null && contactId != "") ?
                <>
                    <div className="px-6 py-4 bg-white shadow-md">
                        <div className="flex items-center gap-4">
                            <div className="avatar">
                                <div className="w-10 rounded-full">
                                    <img src={contacts.find((contact) => contact.contactsId === contactId)?.userProfile} />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <h2 className="text-2xl font-semibold">{contacts.find((contact) => contact.contactsId === contactId)?.userName}</h2>
                                {/* {!onlineUsers.includes(user.userId) ? "online" : "offline"} */}
                            </div>
                        </div>
                    </div>
                    <div ref={scrollableElementRef} id="scrollableElement" className="flex-1 overflow-y-auto no-scrollbar p-6 flex flex-col bg-[url('https://lh3.googleusercontent.com/SZ97RCEv5EVH6iMCDIdHeGJM_BNyHYcnRQ4EdK4V_VyVxLlQS8GY1U3xB8atEBH55OM=h310')]">
                        {receivedMessages.map((message: messageType, index) => {
                            const isDateDifferent =
                                index === 0 ||
                                new Date(message.timestamp).toDateString() !==
                                new Date(receivedMessages[index - 1].timestamp).toDateString();

                            return (
                                isDateDifferent ? <div className="flex justify-center mb-4">
                                    <div className="bg-gray-800 text-white px-4 py-2 rounded-full font-bold uppercase">
                                        {getSeperationDate(new Date(message.timestamp))}
                                    </div>
                                </div>
                                    :
                                    (
                                        message.senderId !== user.userId ? (
                                            <div className="flex flex-col chat chat-start">
                                                <div className="chat chat-start">
                                                    <div className="chat-image avatar">
                                                        <div className="w-10 rounded-full">
                                                            <img alt="Tailwind CSS chat bubble component" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQA4AMBIgACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAAEBQMGAAECB//EADkQAAIBAwMCBAQCCQUBAQEAAAECAwAEEQUSIRMxBiJBURQyYXGBkRUjJEJSobHB8AczYnLR4fFD/8QAGgEAAgMBAQAAAAAAAAAAAAAAAgMAAQQFBv/EACURAAICAgIDAAICAwAAAAAAAAABAhEDIRIxBCJBE1EUYTJxgf/aAAwDAQACEQMRAD8AkWKO3cxu52+hpvohC28qhiQTmkE04mh5HIOMj0onQ7wRTGOV/IwwD9a8lJ3Fp9ivoTcovxDKy/N2PtS2cPDOIZJMK3KmnGoREjevcHIpbfx/F2hZOZF5FCpNNMps41Rt8CoOQi4FR6XJtGBkYqC0m69u0Un+5Hyc+td2oKyFa3KNoBsYRu0N23PldaIs247j7ULP5VUnv71LYEszAAHFc7PGmWd3p/2h6l601yYmOcE1u7BNzCp4xkmgpgZZhEvJNLhHk0iDfSY2nDzSfvHg/Sh9c1OC2RoYCskhGCR6Vq+uzaW4t7cEvtx5fQ1XAqbi0mc55z3NdSUuMVEFdhcdvqNtGt1BFlSM9s0FJNO0/WfO4/MMYpza63PDFsUblAxzRA1LTL20aK4tTFcgHz7eDTXjxThUJU/0wgGxuElAWQcHvSi+t/23EY4zxTGW3SJ90EqkH2rDE5HUcZx6e9Y4Jwm0QWw6c8ydY8RhsZo+ZhHGsSHyjk0dLIi6WY4oRhTuY57mkqTGZiACWaiyxuiNUdrdRyOFDg4NGzXC4CqcClHwO24EmTjPI96JmjO0Fe2aKKUFooc2WpXFplY5XVHGGAPBprK6tCJGxtx3ofwx4Zm1yOSVLhYo4zgkjPOM1rxNF+iJPg+sJCBk4q/IxzcFN9BoAN8jSlU7itfFHvu4qPw94b1HXJJJLVVWJDhndsZ+1WbWfBzSKg0zpo8KYl5OGP0oV4M5R5InZWmvlJCFd2aKhkubdhJZTujewOKEj065hYmaI+vY5rma8aBto4NZ+M4S9dFUM77X9WurdrO8ncwNw64+YfegbW+uILhDaXTQuD+62OPtXDXZEAeU8McVLHFE+DKox3BFM/Jlk05N6CSZPqmhDSxFKznpzfX170pmspt/6k5B5GTVp1c/pSxEeCGjGVH1pJaMwjUkZdTtNdHycUJtSh19JaexhpssxjFtf4WQDyt/EK4lT4a4Jwem57+1dwMJrhOuOARg+1MJbVX3RswZccYrn5sPFOUeimUvVN9jqXWAwhOeOxFNoFWR1kQ8OM5rvUrDqIbe45GP1T/2oPQnZN1nPxJEePtTPHyKUaFtFk0+CCWV0mG4BeOKjt7PoSSEr5STitXbzI8Qt/LlfMQO9EEtFBulbkDNJ8rJ6qNf9DqhdMd962eVRMc1xpEMc080u5QwO0CoRPuWWX1duPtQkJa2n3ocDPmFJwvjcgWOJ3/Rk8V0yiRc4OeaX6jbRXU3UwBvOeKL60V3A8UpOCMLS3TJZOn0ZCGeNiPritEskskK/QdKtBsmkRRWwZWO4ioEtk5L4JHpmjxOT5JBt+poOROlN5SXJ9qZigqtlMf67Pot1o1qtnCqzJgkhcY45yaX6Ppo1uR7YydJF53qOfwpe8BlIRjtU9xVo8KutpN00j3rwWb+H70zHP8ALnsZFW9C+28MzQ3F1bNuliRwFlbsQatd74e0qx0jYkMQmC+VsDLNUV9qkAkdFl8sgwVjwDk9vx7/AJE1AmpWzdNFZlb0OdxIHc5PIX/l+WK6f44RbpXY+OCT7K9pmnRpq7Q6lZuqnnJQkfmK14l0jTtOuRNFgQOM7Q2QD+NWP4p5IhJFddRX5EkZ4/D0A+vJNQm6LrmRgyk7QGGQ32yCzfhilfijx4h/xP7Kyusy28Jh0YmKOTl8d+1QafpbahcPJeTEZ5Ysck1aJLGxuHdXt445iOeim1x9SAT+ZqO08L3VxM4trtERf3uST+FZJ4c3NLtGeeGUTXgmb4PWrm1Sbp2ar8h/eb3qbxHq7JqUnwcjCMrtYjsxqfT/APT2KO4E9/qE0w7mOPyA/c96g8Z6NFYR20lkSqkldhOR2rRnhlh47XVAq6KtJMxbcjklTzzQF/CJR1Rznmi49kTOzqdxGDQ8rBDjHkauV7KV3YLFd3k2qKT2cYpvBC4iVicjGKW3Cq0q+YFA2cUwF0QPlO3FaZZOMVANSpE7ao8OBip7IRXDOUyhbzc9iaHtbZLyZY1ZdxGQaZ/ow20ZZnBC81ojCb62hTVdGkjW3JeVS2329akS783Zlz6GpLG7ilUYU4HHI4qPVRbDErzBSOMLWSWOk9k5UT7VuYSJHVgfQdxVc1K2n0/VrSdyOgTs3gf1qx6faxFRM842n0HtUPiG5W5tWto1XpkcjHrSIYnjly+F0mrMkuLezYG7kBd8BFFDa9cCOAAMPOADVdgtrie+hinlXynOT6CudakaRRFG28BuWz3NPl46fsVbGM8m2DaP3RS2O5diS3YVHBdSPAEdRhRjPvXIKqMUjjWgR1ps6tMuRxRd9GsOpxS2yAhx5qG02LZCBtzn1pjvSNQGABPAzToQcNoJS+GraVtQnkjukUQouAV960YP1yW1qQ245O790Vwk4toHUKcHktilkN7JFIzQg5Y96vm/oeqGF/BcWl3DboOpNMQqKvqasqWy2dqLeeeOLnLEnG5v68VUdX8RNo1jHcOhk1C5GyPHLBe2B9T24qtfovxVrBMs37MjdxITux/g/lXQ8XDGPujVhx1v6eilLJWbN1aCTsG59M59PasMMMtqds0MrlC2E4B54yOM4Brze48Ma9H51vdzZoPqeItL3hgXXYF3RsQeK1NWqHpOLuj0qWOWBmlEsiEIOpN3Yj+FQOAP8xXcerHqD4sCGSQnzp5mVPds9u3p+XrVO0vxobiRoLseZnCkMMMAOf8A2nbTR6hG0ttICJ5MFjnO0Dmgca7GKSY+WY7E6BVkblI93kI/iZv3vt9qKtNbaBgy7h5tqkd3+w7AfXFUn46S1ciNWeCVumkGcDaO7fT/ADNNYb2O7QyRyZQ+XrY27AP3ce9Ra6I6Z6TbeIraW1MpV2K9xGNxPvj3qq+J9fGsiKGzhZEjbdvfuT27UkjmMDJLEzJgcgcFV9APqaj1e4UwrcrwzNtkCdg3+f0pXlZMjhS6+mTLjraBCtz1HUhTnuaWyvJlrKRhknIb0FdTXl1IoECH/saGuIrp1RtvKHJ+tZVitNtiUrJLiFVmgSJifU4pzZtCow+PxqtwXxe9WJY9rZwc+lPvgsLknk96z5I8abQKTTFljLLptx+uLGMcKw9Kd3Gu/s6wryG7seeKBumBjKyRHGPak7JPbKxKFoifX0rXjzOE9ARdlugu4JLVekcYGKhk2yoVOCfQmoLWezNkgTBcjsKHlnKMNwIrm+TjnzcmVIOt3z+rk7r7VLJAroTubP3oCOVXw4OGHajre4WRCCeexB9Kz8pIETalDcL54z+sUZBHcih3IlhtxEME/N707WQsdioHAbgnuKEuLdba76wKlB84zjaa6ayOePj9Lq0CSw9JBgelS6Pp/wCkLnb2281Pbqb+6WFB83arRBo02loZUUbiKDxcLluXwuEOTOF0Z7eMFGBx6VU9djuf0hCNzeXkAdquBvboR4YCkGuuGSNgR1CccVpyqMWuA1wS6J47pLiyWAqFJwGJqWVbRLQCPbuHrVflEsQwQT+NbilZuDkVlfkSfYvkQa3qK2uq6dcrGrzwxsE3DIXLHn74p2/iR5LMsuM45xVW163kmvbWNYmZJPIFVWOTngcEH196s1nosOkaTNBeuJLh2yiAlti+xPv3rrYneKLOhglaKbqfiDUHc9K5aMZ9DxUEOs6iwHUdJQfTvU17oklxKxjKqmQCM47nv/Wsh0zoaa5lZUmXAWIOXVsdyc9s/TGK0QeiTTsDu1h1AeZOjOOVdeDn71Fpur3emXCxyMcqAkbD1yec/hU9pFcP88TgA8AjP8/Wub+06qsHU7sd/ag5b2XxdWi1QXcWow7oGUTqoiTgctnk0B1ZNOmyqB7b/aETkYcg5Jx9Peqpp9/PYXKRl/MDiJs4C/U1bre4TUbciJwJVHTUkfMT3aqlGi1KxzZX42qyv1Y2byysp87ew+1FkK6vEeVYYGfUjsf5H86qUchs5WgnOy1lJVTjPSxxvH58+9WHT7kyRiNxtliYAj2Hp/agktMj6GsUcLRhRjtyajgjiMrGT5PTNV6TUzDI6BvXFNZDLNaoYgdxFYMeKbjKzGkLdXEcerwyWcfPqKMTU45GAJ2sByppUBJ+kgJGIZRijn+FyNwBb1oMqS4qRGNWmiwex+vetQRpeAp0cx+ppAruuGG4rUzavdqghgxGPcd6pZEZKaGE2kRWcweGYqxPCmikh6/DqG+oqtm4l35eVi3uab6bqDpDsAywHf3qSzJrZfsT3Vg6EGLyj2NaRBsJY+cfWo5Z3mcJIWIPoDXMrYAA4ApUcccruqRP9hSsNgJYKw5oK6RJ9zsSS55qCaRpMISdp4IHrRdlZtAw+LRlhJ8rGmS2uMOw4q+jjRJTpuq26Sg7HbEbf2r0jVZ82QGfmxVU1y3sToSXFu69aBlkX8DSOfxFfXEySs2Itowla2/xYvbbY6+CLERKrEAZXtS7xBBGbAsq7ZEO6iNO1H4ja/TbI757VmrrJqKiBCu922hRWOCSyer7+FJoEtYJSsMssW8OKmNjGLgbk2Kaj16W70KW1iLq4RQcAd6Ym6F3bWtymCrkbvcD1p8ccJestEq3TIb/AMQaXoh2rBvnjGzqZ5TPfHtSp7xLj9rjnieJ+WAfzUr8U6Ta3+o3ktv8QwnO+QKCUDDg4P1wKrtlpcbZTTJhExbDdQk4I9cV0FCo0dCEklSPStJtYLy23oowRjt3rqTw9pkY3yQLkfyoLSpY9MtI4FkLbVAJPrUOqazlCu7GPrQtUNMuhY24KRKox61WNSkiYtjFQX2pEu3fFKZbl3J9qii32BKSQBq0Yft2PFEaNfTxSDOVlXhWPCge/wB64kQynFahgaa9S337WX5VPYmnXqjPW7Le/wAPqVkGGBlcEj+Ecn8678PXDSF7aXAmhx7+ZM8flkfgRSHSr1re6KTkhd2xyf3cdxijVujbeIIpcjJkw3t5jyP89qW0G3oarZRy3ssjDK7uKsaOLS3DY4x2oTTLRVt3mlYksxOCO3Nbu7kdNlI7ClQa2zMgX4I3zSXCFRu7EelcDSQOZH3VxoUhjt5sk4ZyQPai5bk+vFczNlkpuLFzbQMksWxUAH2rtobeVcYCt34qAWO3Mkj8gcYrJJFEYPO6myUK9QXVWTWqwJLteNT96Klh24kgRQue3vQtvGXiDZ5omCXcBGRkZ7ioscZbkDWtnRVVG8jz4oSTOCfeirjIG0dzUMyF8IgLHHYCjeoiQHOGBzgg5zTSS/e+thAMNgYz7UFPpl0sXUKggdwDyKJ0i0eNGkZPmHArPuT9RkE+gJrS6Mbwhw4I4Vql0bTZp4836dMIxGPenMEUgk86BdoyD71NM/G0fjVvJKOP2dlt6oxOAEjAVFGABQqTmO7ZkOGB4NbluRAvPP2oRnG9ZAfK38jWKN7kVYZr1oNQ043hlZrhO4PtSbT7ia2gjiDbRM4RRnHJ4pwt1HFEeqwCetIlUz3glcEQhv1a9vxrdgk5NNhrtNjXUdK1hRG/xmkpGFHkM5G36fLVT1eK+Vi2Ibj/AJW75YfiQDQ+o6bexztm4mZMnAY54oRVaFud7H3JrtnUlNONUG2N5dIm25Zj6+buKiv7wucA0P1HDMzDBNRE7zlsUDVsBPVEbMzHJrk4Fds6rQ0soJ4q0gWE20Jup1gRwme7/wAI96bQ2FhaXJ2XnW24djkAj7mqyztyVJGRjIoad9kRBY8/Wpwsr8iihne3sU2ps9swck7mkA43cdvoMUziRrrW4UUcsydvwJ/pVX0lN9xj3Ir0vwjpwjumvLlcSFcRg/u/X70OVqCoVztWWBigXZD2HfFLrwLty1MJmiiZhHjPrSbUHJJ9q5byuEWv2JctED3CxxbYzjPGK2Gfp7jyKGtYXuLhUA4J70zmtniAWlqN7YtXI5NzLNt2gfYURHHuA3xDP1pbA/ScZHY0+ZeoqvET2ooytdCwa4Kwx7UGDWrBvKo9yajuLebJZsndx9qJghKqCpyF7/Shx85T2RvR0U6k6qO+O9SyyLbRskXzEct6muIyFkZgfvQ122c0rPkbfFEiT2EpVM/MT3zRcURaQOj8A/LS6M7YV+1TWs7dUQwqXlc+VRzQ+O3Geg+T+DS4PTXLklzQN0zx2rzsMLyBnvTC30/U7mb/AGQFHfdXHiLRtSNoskir0I+WUd8Vu/iZJyuS0XGG7ZWNHvJJllWcZeM859qy4vQpdIl3s3PsBQt6Ut9StJ9pMT8NzgH702ub2zdcwqgKjkUM/HjbDlBA9rbFlE10+58cDsBRsFr1VMnfHIqbTraF7VZ5JlzkkLmnPSsLayMstzhgpbpqO1TFhnKaSF0r2ebX+pB7iRi2MEjaaWTXyvktgfQV14lvNPuL57izDQRt829uHPuBSq6tpoH2TIyNgHDDHBrtcKWzXHJa0ETXSsSBUDTqPXmg2yO9cjNU4l8ieScnjNRb8mtYzXSrUL2SKMihNRX/AG1980YmM0Hqj/rY19lz+f8A+VcewZdFg8IaYOL6bkZ/Vr/er3anpo8n0qm6Hr9kLWGCVTCyLtyeR+dWnqfs+QeD2rj+Zz58mZXdk8SyzRtL6ZoS4RpZAi9zREc5jh6Q/KlVzqMiXaxwAbs9/alRx/keif5OkOIrUWaZLhT7moLjWIVyp87D2oWW2ln8085Yn0zUDmzsOSd0ntW6GCNDlGhlqNk0L7lHFG6XNvi2E8ij7hUKFXOaUtH8NNlW7+1Yq4syDTa2a31khRoQQWetW7iYAGsltIEbr9mHGSaNSfZKITbMCHD8HuuKBuh59p49zTSVwsJPpiqrqN/1JXRM49658U5zbCeh1axHV7qK2sJQSe5ZeFFM5NO1Pwlc/HxwfGx7dpxwV+1T+AdNls7U36yqssoxtPOBTfVNUvvi0th0nVjzXoPD8WGOHN9jIo34d8YQ6lGV6IhlB5SQgEfhTTW79pNMkTMXmUjO7tXn/ibR5L69SVJo7WQfMy8nH4Vw10umdO0kikuht3NPLhgPbyj/AMxW98mqJKcUV+6gluCYLUmdo33AKCQfpTKLSJLiGKeSMwzP3jJ24x700bVHaNgrsvOAqALx+Faa4PVRWbsN2PakvxYy7YuWZsy2txaxr1H6jj19B9qQeKLqa9ki0m1kKPcHzsO4AprqN2sMDuW4UE0q/wBO7SXWfEr3kmSqY7ntyKfDHGC4xRIK2WGLRl8J2mnwaNZwPqM7/tN7OgeSIBd7FSRxgFe3cmq34jhF1I7Pycnk969S1y3M9vddNCZlkcrx3AOMfkB+VeY6kQzkHuP85pOZ0zoYUmimT2pVyMDvUBixTm8iJJIoF4zSuQXFAQjrZTAolY+a4lwBUslA4OGoO7Be6UkZXgUUzbeayGDqSiZuADkZpsRGRomTSI7yPqadKBIO8UlWzwjdm7i6Uq7JLQ7JkY88djj/ADtVWcGKQTW+UYexqw+FLOW48RyrbEOLq1MzDPOQwHb8TQZ4KUehUWNr6+jkmKxxlDngkd6Wwo5kdlBZ88GrRqWnNZxGe4j8o9falPUWYD4YbiT2UVz+bh1EpzcekRrp91N5p5ig9lrUlnaWY3Mu9z780ZdRajbbQYWCuMggZpbPBcyS4dHJ+opE8s3oB8mPtN1OO9fok/rgOfajZY7cDMsi0vsNCS0nkaOU7SPLnvRD6e0ibXkxn19aX+SDWgaR1HeQRygReYeuPSiLzcsMckqkws2cihbbT4rM56plkbgDHaobq51DTbhoGCzQTDsw4WmJWiKvpPfLLeQiO3IjBGc/SkUekXUUiNcxkRMeWz3rm51V47gRK7hl8owMjFMp9Vllt41kt5+B82zitEcGNL1Q1RTHkcUqWu6JsIBwM+lJ5L6aKYkjNy/yqTwo967F9Nc2+/cIYIRlwO7fSk9ncGa5mu5OcHP0H0rbhwJ+z2BkmkqQ5S46bAyy5KgliT3al9/qUm3qxnAX+Id//hpbq9/FND0VbJZsED+9RzSFrJcd8Y/KtpnS/Y8sriOeIS23RC//ANcqWZD+fb61rUbtEfrK/DJtXcO+DziqtHcT2rda1kKSJyceoNFrexai2JhsuQvyg8OPUD2NSwuNHfiO6ZLJYlPMh598Vff9FNO2abe3MgwzTBQDzgACvM7521LURECI4kGWbtsUf3P/ALXq/wDpFNBHa3VtA+Ytysn5f/Ki7GwdaG2rzlL+4gZtu2UYJOPK43D+eRn6VUta02G7Z3kUxTYyZB+99x2P3q++KLSOSMXUgP7sbMvtng/gT/OkF3ZSLHiMCVPzx96jipLY5Scejze60u6Q4RVnX/gfN+Xf+tKLmCSM4eKRG9mUivQLi0GQQGjYn1X/AA0A9q+7CyqVPoHpDwr4OWdlFK7RyPwxzQzQXMzEQwO31xgfmeKul2kykqhG4djxVf1HrbirSlz/ANsgUKxUVLN/Qma0KOokZHI7qjZx+NSKQ3cbaklKRqN559B60M0jEbiAB/DTEkjPKTbO52IjyvIph4fvp7O8F1DIyNsCIynkDOTn+X5UtWXYh8ob6VLbtt4HGOKJKyI9Bl1+41exe3uCm9h82MbqE0a3ltZkDxMCD6VW7W56RLA4ODirHaapLCE7HGM+4NBkwqXRTyOJfSYDZK7t5h6UHcYusfDQZPYkLQMHiTMHTljjY+hxzTHStVkmcRxJHGP4u9Jlht7DjNS6KtBqVw3cr+VEpcSyOoZuCfStVlcLDCPLoWhsiiNQVHPuaQ+ICZrhS7Ht2B4rKytHwFCy7t42jLEc+4qLT9UvCFtnl3x7sYYZ4rKytXj9MZj6Y41n9RpxSLgbSTSG1JW0gA7SHzfWsrK6kFUTMwa/jUXZYDBBrpCTYnPo1arKIshwDsHowYGgX8pVlOCOc/at1lQJBN5Ky6XPIMbpFRSf+x5q+f6YyuurXEanCiJCB+dZWVcOy4nrF1hoEDAMCyZBHHzCqnqI+CvpIICemDwDzWVlF9HgV029ssB2/Kkt/wADj3rKyhIJb4lYmI74qn6lM8e7YcFmIz+ArdZQsGYnH6zJYknPeulJCkZJ+9ZWUJR0pJVQamUkEgVqsq0WExMcH8P609gYncD71usohU+wtHIXg1OtzLbgdI4LcE1lZUAP/9k=" />
                                                        </div>
                                                    </div>
                                                    <div className="chat-bubble min-w-[110px]"> 
                                                        {message.messageData}
                                                        <div className="flex justify-end">
                                                            <span className="text-gray-500 text-sm">{formatDateAndConvert(new Date(message.timestamp))}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col chat chat-end">
                                                <div className="chat chat-start">
                                                    <div className="chat-image avatar">
                                                        <div className="w-10 rounded-full">
                                                            <img alt="Tailwind CSS chat bubble component" src="https://res.cloudinary.com/duktwv58k/image/upload/v1715690633/photo_zvr1ta.avif" />
                                                        </div>
                                                    </div>
                                                    <div className="chat-bubble chat-bubble-accent min-w-[120px] max-w-[300px]">
                                                        <div className="flex flex-col">
                                                            <h1 className="max-w-[250px] break-words">{message.messageData}</h1>
                                                            <div className="flex justify-end gap-1">
                                                                <span className="text-gray-500 text-sm">{formatDateAndConvert(new Date(message.timestamp))}</span>
                                                                {message.isRead ? <CheckCheck className="h-5" /> : <Check className="w-4 h-4" />}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                            )
                        })}
                    </div>
                    <div className="p-4 bg-white shadow-md flex items-center gap-2">

                        <Popover>
                            <PopoverTrigger><Smile /></PopoverTrigger>
                            <PopoverContent>
                                <Picker data={data} onEmojiSelect={(e: { native: string }) => setTextInput((prev) => `${prev}${e.native}`)} />
                            </PopoverContent>
                        </Popover>

                        <input
                            type="text"
                            value={textInput}
                            onChange={(eve) => setTextInput(eve.target.value)}
                            placeholder="Type your message..."
                            className="w-full px-3 py-2 rounded-lg bg-gray-100 border-2 border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center justify-center"
                            onClick={() => {
                                if (textInput != "") {
                                    sendMessage(textInput);
                                    setTextInput(" ");
                                } else {
                                    toast.error("Message Is Empty")
                                }
                            }}
                        >
                            <FiSend size={20} />
                        </button>
                    </div>
                    <Toaster />
                </> :
                <div className="flex-1 flex justify-center items-center bg-white">
                    <img
                        src="https://img.freepik.com/premium-vector/online-communication-with-mobile-phone-concept-receiving-messages-comments-likes-emojis-internet-chat-social-media-smartphone-messenger-flat-vector-illustration-isolated-white-background_198278-18915.jpg"
                        className="max-h-full max-w-full"
                        alt="Chat Image"
                    />
                </div>
            }
        </>
    )
}

export default Messages


const formatDateAndConvert = (date: Date) => {

    if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
        date = new Date();
    }

    let hours: number = date.getHours();
    let minutes: number = date.getMinutes();

    let meridiem: string = hours >= 12 ? 'PM' : 'AM';

    let hour: number = hours > 12 ? hours - 12 : hours;

    let minutesString: string = minutes < 10 ? '0' + minutes : minutes.toString();
    let timeString: string = `${hour}.${minutesString} ${meridiem}`;
    return timeString;
}

const getSeperationDate = (date: Date) => {

    const messageDate = new Date(date);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    let displayDate;
    if (messageDate.toDateString() === today.toDateString()) {
        displayDate = "Today";
    } else if (messageDate.toDateString() === yesterday.toDateString()) {
        displayDate = "Yesterday";
    } else {
        displayDate = getFormatedData(date);
    }

    return displayDate;
}

function getFormatedData(date: Date) {

    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
}