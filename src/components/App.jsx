import React from "react";
import DropAndCrop from "./DropAndCrop";
import { VscCloudUpload, VscCloudDownload } from "react-icons/vsc";
import TopNav from "./TopNav";

const App = () => {
	return (
		<div>
			<div className="App">
				<TopNav />
				<section className="container">
					<div className="text-center">
						<h1>Online Koupe Image</h1>
						<p>
							<br />
							<b>Note: </b> after pressing the upload button <VscCloudUpload />
							{"  "}
							or simply drag an image for uploading an image{" "}
							<code>drag the cursor hover the image </code> to select the
							desired space area in the canvas you want to keep ( download the
							croped image you've selected ^^) then download the image by
							pressing the download button <VscCloudDownload />
						</p>
					</div>
				</section>

				<section className="m-3">
					<div className="">
						<div className="card mt-3">
							<div className="card-header">
								<div className="text-center">
									<h4>Online Koupe Image</h4>
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
