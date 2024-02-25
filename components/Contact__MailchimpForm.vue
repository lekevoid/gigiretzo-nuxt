<template>
	<div id="mc_embed_shell" v-if="isFormSubmitted === false">
		<div id="mc_embed_signup">
			<form
				action="https://ArtzyRetzo.us20.list-manage.com/subscribe/post?u=b78567d38aae53c8025a1103d&amp;id=420306bddd&amp;f_id=00035ae6f0"
				method="post"
				id="mc-embedded-subscribe-form"
				name="mc-embedded-subscribe-form"
				class="validate"
				target="_blank"
			>
				<div id="mc_embed_signup_scroll">
					<div class="indicates-required"><span class="asterisk">*</span> {{ $t("Indicates required") }}</div>
					<div class="mc-field-group">
						<label for="mce-FNAME">{{ $t("form_first_name") }} <span class="asterisk">*</span></label>
						<input type="text" name="FNAME" class="required text" id="mce-FNAME" required="" value="" />
					</div>
					<div class="mc-field-group">
						<label for="mce-LNAME">{{ $t("form_last_name") }} <span class="asterisk">*</span></label>
						<input type="text" name="LNAME" class="required text" id="mce-LNAME" required="" value="" />
					</div>
					<div class="mc-field-group">
						<label for="mce-EMAIL">{{ $t("form_email") }} <span class="asterisk">*</span></label>
						<input type="email" name="EMAIL" class="required email" id="mce-EMAIL" required="" value="" />
					</div>
					<div class="mc-field-group">
						<label for="mce-WHERE">{{ $t("form_how_do_you_know_me") }} <span class="asterisk">*</span></label>
						<select name="WHERE" class="required" id="mce-WHERE">
							<option value=""></option>
							<option value="Instagram">Instagram</option>
							<option value="Facebook">Facebook</option>
							<option value="LinkedIn">LinkedIn</option>
							<option value="Deviantart">Deviantart</option>
							<option value="At an Event">{{ $t("form_at_an_event") }}</option>
							<option value="Referral">{{ $t("form_referral") }}</option>
							<option value="Other">{{ $t("form_other") }}</option>
						</select>
					</div>
					<div class="mc-field-group">
						<label for="mce-ARTISTSTAT">{{ $t("form_are_you_a_va") }} <span class="asterisk">*</span></label>
						<select name="ARTISTSTAT" class="required" id="mce-ARTISTSTAT" @change="handleVAKindChange">
							<option value=""></option>
							<option value="Yes | Oui">{{ $t("yes") }}</option>
							<option value="No | Non">{{ $t("no") }}</option>
							<option value="Not Sure | Pas certain.e">{{ $t("not_sure") }}</option>
						</select>
					</div>
					<div class="mc-field-group input-group" v-if="isAVisualArtist">
						<strong>{{ $t("form_what_kind_of_va") }} </strong>
						<ul>
							<li>
								<input type="checkbox" name="group[1477][1]" id="mce-group[1477]-1477-0" value="" />
								<label for="mce-group[1477]-1477-0">
									{{ $t("form_drawing") }}
								</label>
							</li>
							<li>
								<input type="checkbox" name="group[1477][2]" id="mce-group[1477]-1477-1" value="" />
								<label for="mce-group[1477]-1477-1">
									{{ $t("form_painting") }}
								</label>
							</li>
							<li>
								<input type="checkbox" name="group[1477][4]" id="mce-group[1477]-1477-2" value="" />
								<label for="mce-group[1477]-1477-2">
									{{ $t("form_sculpture") }}
								</label>
							</li>
							<li>
								<input type="checkbox" name="group[1477][128]" id="mce-group[1477]-1477-3" value="" />
								<label for="mce-group[1477]-1477-3">
									{{ $t("form_photography") }}
								</label>
							</li>
							<li>
								<input type="checkbox" name="group[1477][256]" id="mce-group[1477]-1477-4" value="" />
								<label for="mce-group[1477]-1477-4">
									{{ $t("form_printmaking") }}
								</label>
							</li>
							<li>
								<input type="checkbox" name="group[1477][512]" id="mce-group[1477]-1477-5" value="" />
								<label for="mce-group[1477]-1477-5">
									{{ $t("form_filmmaking") }}
								</label>
							</li>
							<li>
								<input type="checkbox" name="group[1477][1024]" id="mce-group[1477]-1477-6" value="" />
								<label for="mce-group[1477]-1477-6">
									{{ $t("form_computer_art") }}
								</label>
							</li>
							<li>
								<input type="checkbox" name="group[1477][2048]" id="mce-group[1477]-1477-7" value="" />
								<label for="mce-group[1477]-1477-7">
									{{ $t("form_others") }}
								</label>
							</li>
						</ul>
					</div>
					<div class="mc-field-group">
						<label for="mce-MESSAGE">{{ $t("form_message") }} <span class="asterisk">*</span></label>
						<textarea name="MESSAGE" id="mce-MESSAGE" class="required" required=""></textarea>
					</div>
					<div class="mc-field-group">
						<label for="mce-NEWSLETTER">{{ $t("form_subscribe") }} </label
						><select name="NEWSLETTER" class="" id="mce-NEWSLETTER">
							<option value=""></option>
							<option value="Yes">{{ $t("yes") }}</option>
							<option value="No">{{ $t("no") }}</option>
							<option value="Already Am">{{ $t("already_am") }}</option>
						</select>
					</div>
					<div id="mce-responses" class="clear foot">
						<div class="response" id="mce-error-response" style="display: none"></div>
						<div class="response" id="mce-success-response" style="display: none"></div>
					</div>
					<div aria-hidden="true" style="position: absolute; left: -5000px">
						/* real people should not fill this in and expect good things - do not remove this or risk form bot signups */
						<input type="text" name="b_b78567d38aae53c8025a1103d_420306bddd" tabindex="-1" value="" />
					</div>
					<div class="optionalParent">
						<div class="clear foot">
							<input type="submit" name="subscribe" id="mc-embedded-subscribe" class="button" :value="$t('form_submit')" />
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
	<div v-if="isFormSubmitted === true" v-html="$t('thank-you-contact')" />
</template>

<script setup>
const isAVisualArtist = ref(null);
const isFormSubmitted = ref("undetermined");

const route = useRoute();

function handleVAKindChange($event) {
	if ($event.target.value.match("Yes")) {
		isAVisualArtist.value = true;
	} else {
		isAVisualArtist.value = false;
	}
}

function handleSubmit() {
	isFormSubmitted.value = true;
}

onMounted(() => {
	if (route.query.submitted === "true") {
		isFormSubmitted.value = true;
	} else {
		isFormSubmitted.value = false;
	}
});

onMounted(() => {
	useHead({
		script: [
			{ id: "mc-validate", src: "//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js" },
			{
				id: "mc-fields",
				innerHTML: `(function ($) {
						window.fnames = new Array();
						window.ftypes = new Array();
						fnames[0] = "EMAIL";
						ftypes[0] = "email";
						fnames[1] = "FNAME";
						ftypes[1] = "text";
						fnames[2] = "LNAME";
						ftypes[2] = "text";
						fnames[11] = "WHERE";
						ftypes[11] = "dropdown";
						fnames[6] = "MESSAGE";
						ftypes[6] = "text";
						fnames[12] = "NEWSLETTER";
						ftypes[12] = "dropdown";
						fnames[10] = "ARTISTSTAT";
						ftypes[10] = "dropdown";
						fnames[7] = "LANG";
						ftypes[7] = "radio";
						fnames[9] = "LANG2";
						ftypes[9] = "text";
						fnames[4] = "PHONE";
						ftypes[4] = "phone";
						fnames[3] = "ADDRESS";
						ftypes[3] = "address";
					})(jQuery);
					var $mcj = jQuery.noConflict(true);`,
			},
		],
	});
});
</script>

<style lang="scss">
@import "~/assets/styles/dependencies";

.indicates-required {
	font-size: 14px;
	font-style: italic;
	text-align: right;
	margin: 0 0 12px;
}

.asterisk {
	color: #f00;
}

#mc_embed_signup {
	form {
		margin: 0;

		label,
		strong {
			font-size: 1em;
			font-weight: 700;
			display: block;
			margin-bottom: 6px;
		}

		.mc-field-group {
			margin-bottom: 30px;

			input,
			select,
			textarea {
				appearance: none;
				display: block;
				border-radius: 1em;
				border: 1px solid #eaeaea;
				padding: 0.4em 0.8em;
				font-size: 1.2em;
				margin: 0;
				text-indent: 0;
				background: #f8f8f8 none;
				transition: background-color 0.3s, border-color 0.3s, box-shadow 0.3s;
				width: 100%;

				&.mce_inline_error {
					border-bottom-left-radius: 0;
					border: 2px solid #f00;
				}
			}

			textarea {
				height: 200px;
			}

			input[type="checkbox"] {
				appearance: auto;
				height: 0.9em;
				width: 0.9em;
				padding: 0;
				margin-right: 0.4em;
				top: 0.2em;
			}

			ul {
				list-style-type: none;
				margin: 0;
				padding: 0;

				li {
					input,
					label {
						display: inline-block;
						width: auto;
					}
					label {
						font-size: 14px;
					}
				}
			}
		}

		div.mce_inline_error {
			background: linear-gradient(to bottom, red 0%, #6b0505 100%);
			border-radius: 0 0 8px 8px;
			color: #fff;
			font-weight: bold;
			margin: 0;
			display: inline-block;
			position: relative;
			top: -5px;
			padding: 5px 10px;
			font-size: 14px;
			z-index: 1;
		}

		input[type="submit"] {
			background: linear-gradient(to bottom, #0af 0%, #05f 100%);
			background-color: #05f;
			border: 0 none;
			border-radius: 8px;
			cursor: pointer;
			color: #fff;
			font-weight: bold;
			height: auto;
			line-height: 100%;
			padding: 16px 30px;
			transition: filter 0.3s ease;

			&:hover {
				filter: hue-rotate(-60deg);
			}
		}
	}

	#mce-responses {
		display: none;
	}
}

@media (min-width: $sm) {
	#mc_embed_signup {
		form {
			margin: 0;

			label,
			strong {
				font-size: 0.8em;
			}

			.mc-field-group {
				input,
				select,
				textarea {
					font-size: 0.8em;
				}
			}
		}
	}
}
</style>
