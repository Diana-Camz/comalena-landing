import Image from "next/image";

type LayoutProps = {
    children: React.ReactNode
};

export default function Layout ({children}: LayoutProps) {
    return (
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col">
            {children}
            <div className="fixed bottom-6 right-4 z-50">
                <a href="https://wa.me/523122703873" target="_blank" rel="noopener noreferrer">
                    <Image src="/images/whatsapp-icon.svg" alt="WhatsApp"  width={56} height={56} className="hover:scale-105 transition-transform cursor-pointer"/>
                </a>
            </div>
        </div>
    )
}