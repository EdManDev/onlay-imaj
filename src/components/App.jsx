import React from "react";
import DropAndCrop from "./DropAndCrop";
import {
	VscCloudUpload,
	VscChromeClose,
	VscCloudDownload,
} from "react-icons/vsc";

const App = () => {
	return (
		<div>
			<div className="App">
				<div className="text-center">
					<h1>Playground for Image Upload n Crop it By Edman</h1>
					<p>
						<br />
						<b>Note: </b> after pressing the upload button <VscCloudUpload />
						{"  "}
						or simply drag an image for uploading an image{" "}
						<code>drag the cursor hover the image </code> to select the desired
						space area in the canvas you want to keep ( download the croped
						image you've selected ^^) then download the image by pressing the
						download button <VscCloudDownload />
					</p>
				</div>

				<section className="m-3">
					<div className="">
						<div className="card mt-3">
							<div className="card-header">
								<div className="text-center">
									<h3>Drop n Crop</h3>
								</div>
							</div>
							<div className="card-body">
								<div className="row">
									<DropAndCrop />
								</div>
							</div>
							<div className="card-footer">Create By Edman</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
};

export default App;
