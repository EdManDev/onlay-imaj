import React from "react";
import DropAndCrop from "./DropAndCrop";

const App = () => {
	return (
		<div>
			<div className="App">
				<div className="text-center">
					<h1>Playground for Bootstrap File Input by Krajee</h1>
					<p>
						This Pen uses Bootstrap 3.3.7 (but Bs 4.x is supported as well) and
						Font-Awesome 5 icons. <br />
						<b>Note: </b> In the samples of <code>Bootstrap File Input</code>{" "}
						not all work FA icons worked (hence the next line ^^)
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
