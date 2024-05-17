import React, { useRef, useState } from 'react';

interface ProjectProps {
    openModal: () => {}
}

const VideoUploading = () => {
    const modalRef = useRef<HTMLDialogElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [preview, setPreview] = useState<string | null>(null);
    const [isDocumentFile, setIsDocumentFile] = useState<boolean>(false);
    const [file, setFile] = useState<File | null>(null);

    const openModal = () => {
        if (modalRef.current) {
            modalRef.current.showModal();
        }
    };

    const handleSubmit = (eve: React.FormEvent<HTMLFormElement>) => {
        eve.preventDefault();

        console.log("value is submitted");

    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // ... (implementation)
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        // ... (implementation)
    };

    return (
        <div>
    );
};

export default VideoUploading;