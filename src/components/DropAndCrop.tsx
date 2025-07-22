import React, { useState, createRef } from "react";
import Dropzone from "react-dropzone";
import ReactCrop, { type Crop, centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import {
	getFileExtensionOfBase64,
	image64ToCanvasRef,
	downloadBase64File,
} from "../utils/FileUtils";

const acceptedFileTypesArray = [
	"image/x-png",
	"image/png",
	"image/x-jpg",
	"image/jpeg",
	"image/gif",
	"image/webp",
];

interface DropAndCropProps {
	onBack: () => void;
}

const DropAndCrop: React.FC<DropAndCropProps> = ({ onBack }) => {
	const [msg, setMsg] = useState<{ text: string; color: string } | null>(null);
	const [imgSrc, setImgSrc] = useState<string | null>(null);
	const [imgRef, setImgRef] = useState<{ scaleX?: number; scaleY?: number }>({});
	const [crop, setCrop] = useState<Crop>();
	const [canvasRef] = useState(createRef<HTMLCanvasElement>());

	// Verify file for image files
	const maxSize = 10485760; // 10 Megabyte
	const verifyFileSize = (file: File) => {
		if (file !== null && file.size > maxSize) {
			setMsg({
				text: "File size is too large (max 10MB)",
				color: "error",
			});
			return false;
		}
		if (!acceptedFileTypesArray.includes(file.type)) {
			setMsg({
				text: "Please insert a valid image file",
				color: "error",
			});
			return false;
		}
		return true;
	};

	const handleOnDrop = (files: File[], rejFiles: any, e: any) => {
		handleClear(e);
		if (rejFiles && rejFiles.length > 0) {
			setMsg({
				text: "Please insert a valid image file",
				color: "error",
			});
		}
		const imgFile = files.length > 0 ? files[0] : null;
		if (imgFile !== null && verifyFileSize(imgFile)) {
			const reader = new FileReader();
			reader.addEventListener(
				"load",
				() => {
					setImgSrc(reader.result as string);
				},
				false
			);
			reader.readAsDataURL(imgFile);
			setMsg(null);
		}
	};

	const handleImageLoaded = (e: React.SyntheticEvent<HTMLImageElement>) => {
		const image = e.currentTarget;
		const { naturalWidth: width, naturalHeight: height } = image;
		
		setImgRef({
			scaleX: width / image.width,
			scaleY: height / image.height,
		});

		// Set initial crop - center crop with 50% width
		const initialCrop = centerCrop(
			makeAspectCrop(
				{ unit: '%', width: 50 },
				1, // Free aspect ratio
				width,
				height
			),
			width,
			height
		);

		setCrop(initialCrop);
	};

	const handleOnCropChange = (crop: Crop) => {
		setCrop(crop);
	};

	const handleOnCropComplete = (crop: Crop) => {
		const canvasCurrentRef = canvasRef.current;
		const img64Src = imgSrc;
		if (canvasCurrentRef && img64Src && crop.width && crop.height) {
			image64ToCanvasRef(canvasCurrentRef, img64Src, crop, imgRef);
		}
	};

	const handleDownload = (e: React.MouseEvent) => {
		e.preventDefault();
		const canvasCurrentRef = canvasRef.current;
		if (!canvasCurrentRef || !imgSrc) return;

		const fileExtension = getFileExtensionOfBase64(imgSrc);
		const croppedImgData = canvasCurrentRef.toDataURL("image/" + fileExtension);
		const fileName = "croppedImage." + fileExtension;
		downloadBase64File(croppedImgData, fileName);
		setMsg({
			text: "Image downloaded successfully!",
			color: "success",
		});
	};

	const handleClear = (e: React.MouseEvent) => {
		e.preventDefault();
		const canvas = canvasRef.current;
		if (canvas && canvas !== null) {
			const ctx = canvas.getContext("2d");
			if (ctx !== null) ctx.clearRect(0, 0, canvas.width, canvas.height);
			setImgSrc(null);
			setImgRef({});
			setCrop(undefined);
			setMsg(null);
		} else {
			setMsg({
				text: "Nothing to clear",
				color: "warning",
			});
		}
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
			{/* Header */}
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-md">
					<div className="card flex items-center justify-center" style={{ 
						width: '40px', 
						height: '40px',
						background: 'var(--secondary-50)',
						border: '1px solid var(--secondary-200)'
					}}>
						<svg width="20" height="20" fill="none" stroke="var(--secondary-600)" viewBox="0 0 24 24" strokeWidth="2">
							<path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
						</svg>
					</div>
					<div>
						<h2 className="heading-2" style={{ marginBottom: '0' }}>Image Crop & Download</h2>
						<p className="text-sm" style={{ color: 'var(--gray-500)', margin: '0' }}>Upload, crop, and download images</p>
					</div>
				</div>
				<button onClick={onBack} className="btn btn-secondary">
					<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
						<path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
					</svg>
					Back to OCR
				</button>
			</div>

			{/* Message */}
			{msg && (
				<div className={`card animate-slide-in status-indicator status-${msg.color}`} style={{ 
					padding: 'var(--space-md)',
					justifyContent: 'center'
				}}>
					{msg.text}
				</div>
			)}

			{/* Upload Section */}
			<div className="card card-padding">
				<Dropzone
					onDrop={handleOnDrop}
					accept={{
						'image/*': acceptedFileTypesArray
					}}
					multiple={false}
				>
					{({ getRootProps, getInputProps, isDragActive }) => (
						<div
							{...getRootProps()}
							className="card"
							style={{
								border: isDragActive 
									? '2px dashed var(--primary-400)' 
									: '2px dashed var(--gray-300)',
								background: isDragActive
									? 'var(--primary-50)'
									: 'var(--gray-50)',
								padding: 'var(--space-xl)',
								textAlign: 'center',
								cursor: 'pointer',
								transition: 'all var(--transition-base)'
							}}
						>
							<div style={{ marginBottom: 'var(--space-lg)' }}>
								<svg width="48" height="48" fill="none" stroke="var(--primary-500)" viewBox="0 0 24 24" strokeWidth="2" style={{ margin: '0 auto' }}>
									<path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
								</svg>
							</div>
							<button type="button" className="btn btn-primary" style={{ marginBottom: 'var(--space-md)' }}>
								<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
									<path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
								</svg>
								Click to select image
							</button>
							<p className="text-sm" style={{ color: 'var(--gray-600)', margin: '0' }}>
								or drag and drop image here
							</p>
							<input {...getInputProps()} />
						</div>
					)}
				</Dropzone>

				<div className="flex justify-center" style={{ marginTop: 'var(--space-md)' }}>
					<button onClick={handleClear} className="btn btn-secondary">
						<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
							<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
						Clear
					</button>
				</div>
			</div>

			{/* Crop and Preview Section */}
			{imgSrc !== null ? (
				<div className="grid grid-2">
					{/* Crop Section */}
					<div className="card card-padding">
						<h3 className="heading-3">Crop Image</h3>
						<div style={{ marginBottom: 'var(--space-lg)' }}>
							<ReactCrop
								crop={crop}
								onChange={handleOnCropChange}
								onComplete={handleOnCropComplete}
							>
								<img 
									src={imgSrc} 
									onLoad={handleImageLoaded}
									alt="Crop target"
									style={{ maxWidth: '100%', height: 'auto' }}
								/>
							</ReactCrop>
						</div>
					</div>

					{/* Preview Section */}
					<div className="card card-padding">
						<div className="flex items-center justify-between" style={{ marginBottom: 'var(--space-lg)' }}>
							<h3 className="heading-3">Preview</h3>
							<button onClick={handleDownload} className="btn btn-primary">
								<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
									<path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
								</svg>
								Download
							</button>
						</div>
						<div className="card" style={{ 
							background: 'var(--gray-50)', 
							padding: 'var(--space-md)',
							minHeight: '200px',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center'
						}}>
							<canvas 
								ref={canvasRef} 
								style={{ 
									maxWidth: '100%', 
									maxHeight: '300px',
									borderRadius: 'var(--radius-md)'
								}}
							/>
						</div>
					</div>
				</div>
			) : (
				<div className="card card-padding text-center">
					<div style={{ color: 'var(--gray-500)' }}>
						<svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" style={{ margin: '0 auto var(--space-md)' }}>
							<path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
						</svg>
						<h3 className="heading-3">No Image Selected</h3>
						<p className="text-sm">Upload an image above to start cropping</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default DropAndCrop;