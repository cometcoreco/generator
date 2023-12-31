const fetch = require('node-fetch');
const fs = require('fs');

// Replace with your actual authorization header value
const AUTH_HEADER_VALUE = 'Basic YmFkYm91amllc3RvcmVAZ21haWwuY29tOmJhZGJvdWppZXN0b3JlQGdtYWlsLmNvbQ==';

// Extract slugs from URLs
const urls = [
    'https://verif.tools/en/finland_passport',
    'https://verif.tools/en/russia_passport',
    'https://verif.tools/en/malaysia_passport_2',
    'https://verif.tools/en/new_zealand_passport',
    'https://verif.tools/en/canada_passport',
    'https://verif.tools/en/malaysia_passport',
    'https://verif.tools/en/turkey_passport',
    'https://verif.tools/en/cameroon_passport',
    'https://verif.tools/en/kazakhstan_passport',
    'https://verif.tools/en/dominican_republic_passport',
    'https://verif.tools/en/vietnam_passport',
    'https://verif.tools/en/kenya_passport',
    'https://verif.tools/en/croatia_passport',
    'https://verif.tools/en/czech_passport',
    'https://verif.tools/en/rsa_passport',
    'https://verif.tools/en/russia_external_passport_1',
    'https://verif.tools/en/peru_passport',
    'https://verif.tools/en/netherlands_passport',
    'https://verif.tools/en/serbia_passport',
    'https://verif.tools/en/mexico_passport',
    'https://verif.tools/en/russia_passport_old',
    'https://verif.tools/en/brazil_passport',
    'https://verif.tools/en/uae_passport',
    'https://verif.tools/en/bulgaria_passport',
    'https://verif.tools/en/austria_passport',
    'https://verif.tools/en/spain_passport',
    'https://verif.tools/en/sweden_passport',
    'https://verif.tools/en/swiss_passport',
    'https://verif.tools/en/india_passport',
    'https://verif.tools/en/georgia_passport',
    'https://verif.tools/en/ukraine_passport',
    'https://verif.tools/en/hong_kong_passport',
    'https://verif.tools/en/slovenia_passport',
    'https://verif.tools/en/china_passport',
    'https://verif.tools/en/estonia_passport',
    'https://verif.tools/en/latvia_passport',
    'https://verif.tools/en/ireland_passport',
    'https://verif.tools/en/germany_passport',
    'https://verif.tools/en/denmark_passport',
    'https://verif.tools/en/armenia_passport',
    'https://verif.tools/en/bangladesh_passport',
    'https://verif.tools/en/norway_passport',
    'https://verif.tools/en/france_passport',
    'https://verif.tools/en/russia_external_passport_2',
    'https://verif.tools/en/passport_photo',
    'https://verif.tools/en/hungary_passport',
    'https://verif.tools/en/south_korea_passport',
    'https://verif.tools/en/uk_passport_new',
    'https://verif.tools/en/italy_passport',
    'https://verif.tools/en/singapore_passport',
    'https://verif.tools/en/belarus_passport',
    'https://verif.tools/en/venezuela_passport',
    'https://verif.tools/en/indonesia_passport_fast',
    'https://verif.tools/en/usa_passport',
    'https://verif.tools/en/fb_russia_passport',
    'https://verif.tools/en/australia_passport_old',
    'https://verif.tools/en/australia_passport',
    'https://verif.tools/en/lt_passport',
    'https://verif.tools/en/usa_passport_new',
    'https://verif.tools/en/thailand_passport',
    'https://verif.tools/en/ivory_coast_passport',
    'https://verif.tools/en/uk_passport_new_fast',
    'https://verif.tools/en/uk_passport',
    'https://verif.tools/en/indonesia_passport',
    'https://verif.tools/en/israel_passport',
    'https://verif.tools/en/poland_passport_new',
    'https://verif.tools/en/poland_passportsf',
    'https://verif.tools/en/dl_ri',
    'https://verif.tools/en/dl_texas',
    'https://verif.tools/en/dl_alberta',
    'https://verif.tools/en/dl_ma',
    'https://verif.tools/en/japan_dl',
    'https://verif.tools/en/dl_nm',
    'https://verif.tools/en/dl_la',
    'https://verif.tools/en/dl_michigan',
    'https://verif.tools/en/dl_mississippi',
    'https://verif.tools/en/dl_oklahoma',
    'https://verif.tools/en/russia_dl_2',
    'https://verif.tools/en/dl_va',
    'https://verif.tools/en/estonia_dl',
    'https://verif.tools/en/dl_indiana',
    'https://verif.tools/en/dl_kentucky',
    'https://verif.tools/en/dl_maine',
    'https://verif.tools/en/finland_dl',
    'https://verif.tools/en/norway_dl',
    'https://verif.tools/en/dl_wyoming',
    'https://verif.tools/en/dl_sc',
    'https://verif.tools/en/denmark_dl',
    'https://verif.tools/en/italy_dl',
    'https://verif.tools/en/dl_vermont',
    'https://verif.tools/en/spain_dl',
    'https://verif.tools/en/dl_pa',
    'https://verif.tools/en/dl_nevada',
    'https://verif.tools/en/dl_oregon',
    'https://verif.tools/en/dl_nebraska',
    'https://verif.tools/en/dl_nh',
    'https://verif.tools/en/dl_tennessee',
    'https://verif.tools/en/dl_ny',
    'https://verif.tools/en/dl_wv',
    'https://verif.tools/en/dl_texas_new',
    'https://verif.tools/en/australia_dl',
    'https://verif.tools/en/dl_montana',
    'https://verif.tools/en/dl_sd',
    'https://verif.tools/en/israel_dl',
    'https://verif.tools/en/ukraine_dl',
    'https://verif.tools/en/dl_hawaii',
    'https://verif.tools/en/dl_alaska',
    'https://verif.tools/en/ireland_dl',
    'https://verif.tools/en/dl_nc',
    'https://verif.tools/en/dl_delaware',
    'https://verif.tools/en/dl_connecticut',
    'https://verif.tools/en/dl_ar',
    'https://verif.tools/en/dl_wi',
    'https://verif.tools/en/romania_dl',
    'https://verif.tools/en/brazil_dl',
    'https://verif.tools/en/dl_ohio',
    'https://verif.tools/en/germany_dl',
    'https://verif.tools/en/dl_ks',
    'https://verif.tools/en/sweden_dl',
    'https://verif.tools/en/turkey_dl',
    'https://verif.tools/en/slovakia_dl',
    'https://verif.tools/en/poland_dl',
    'https://verif.tools/en/dl_il',
    'https://verif.tools/en/dl_texas_old',
    'https://verif.tools/en/czech_dl',
    'https://verif.tools/en/south_korea_dl',
    'https://verif.tools/en/uk_dl',
    'https://verif.tools/en/kazakhstan_dl',
    'https://verif.tools/en/dl_quebec',
    'https://verif.tools/en/dl_british_columbia',
    'https://verif.tools/en/australia_queensland_dl',
    'https://verif.tools/en/dl_id',
    'https://verif.tools/en/dl_nd',
    'https://verif.tools/en/dl_iowa',
    'https://verif.tools/en/dl_wa',
    'https://verif.tools/en/dl_florida',
    'https://verif.tools/en/dl_az',
    'https://verif.tools/en/dl_mo',
    'https://verif.tools/en/dl_minnesota',
    'https://verif.tools/en/dl_md',
    'https://verif.tools/en/belarus_dl',
    'https://verif.tools/en/france_dl',
    'https://verif.tools/en/belgium_dl',
    'https://verif.tools/en/dl_ca',
    'https://verif.tools/en/dl_ga',
    'https://verif.tools/en/austria_dl',
    'https://verif.tools/en/uk_dl_new',
    'https://verif.tools/en/dl_ut',
    'https://verif.tools/en/new_zealand_dl',
    'https://verif.tools/en/kyrgyzstan_dl',
    'https://verif.tools/en/dl_manitoba',
    'https://verif.tools/en/dl_colorado',
    'https://verif.tools/en/dl_al',
    'https://verif.tools/en/dl_ontario',
    'https://verif.tools/en/nigeria_dl',
    'https://verif.tools/en/russia_dl',
    'https://verif.tools/en/dl_nj',
    'https://verif.tools/en/germany_driver_card',
    'https://verif.tools/en/netherlands_driving_licence',
    'https://verif.tools/en/uk_residence_card',
    'https://verif.tools/en/netherlands_residence_card',
    'https://verif.tools/en/spain_residence_permit',
    'https://verif.tools/en/russia_residence_permit',
    'https://verif.tools/en/canada_residence_card',
    'https://verif.tools/en/france_residence_card',
    'https://verif.tools/en/korea_registration_card',
    'https://verif.tools/en/us_green_card',
    'https://verif.tools/en/portugal_residence_permit',
    'https://verif.tools/en/greece_residence_permit',
    'https://verif.tools/en/lithuania_residense_card',
    'https://verif.tools/en/estonia_residence_permit',
    'https://verif.tools/en/estonia_residence_permit_new',
    'https://verif.tools/en/uk_residence_card_new',
    'https://verif.tools/en/france_id',
    'https://verif.tools/en/croatia_id',
    'https://verif.tools/en/bangladesh_id',
    'https://verif.tools/en/hong_kong_id',
    'https://verif.tools/en/spain_id',
    'https://verif.tools/en/kazakhstan_id',
    'https://verif.tools/en/slovakia_id',
    'https://verif.tools/en/austria_id',
    'https://verif.tools/en/sweden_id',
    'https://verif.tools/en/uk_military_id',
    'https://verif.tools/en/czech_id',
    'https://verif.tools/en/france_id_old',
    'https://verif.tools/en/norway_id',
    'https://verif.tools/en/estonia_id',
    'https://verif.tools/en/uae_id',
    'https://verif.tools/en/belgium_id',
    'https://verif.tools/en/usa_id',
    'https://verif.tools/en/germany_id',
    'https://verif.tools/en/poland_id',
    'https://verif.tools/en/latvia_id',
    'https://verif.tools/en/netherlands_id',
    'https://verif.tools/en/ukraine_id',
    'https://verif.tools/en/malaysia_id',
    'https://verif.tools/en/swiss_id',
    'https://verif.tools/en/turkey_id',
    'https://verif.tools/en/romania_id',
    'https://verif.tools/en/fb_ukraine_id',
    'https://verif.tools/en/us_military_id',
    'https://verif.tools/en/china_id_zhuang',
    'https://verif.tools/en/italy_id',
    'https://verif.tools/en/china_id_low_q',
    'https://verif.tools/en/hungary_id',
    'https://verif.tools/en/singapore_id',
    'https://verif.tools/en/hong_kong_id_new',
    'https://verif.tools/en/greece_id_card',
    'https://verif.tools/en/chile_id_card',
    'https://verif.tools/en/china_id',
    'https://verif.tools/en/portugal_id',
    'https://verif.tools/en/finland_id',
    'https://verif.tools/en/china_id_uighur',
    'https://verif.tools/en/rostelecom_bill',
    'https://verif.tools/en/italy_bill',
    'https://verif.tools/en/scana_bill',
    'https://verif.tools/en/canada_bill_rogers',
    'https://verif.tools/en/texas_bill',
    'https://verif.tools/en/china_power_bill',
    'https://verif.tools/en/uk_bill_scottish_power',
    'https://verif.tools/en/belgium_bill',
    'https://verif.tools/en/tmobile_bill_pdf',
    'https://verif.tools/en/california_bill',
    'https://verif.tools/en/uk_bill_ee',
    'https://verif.tools/en/postbank_statement',
    'https://verif.tools/en/bank_of_america_statement',
    'https://verif.tools/en/bbva_statement',
    'https://verif.tools/en/barclays_statement',
    'https://verif.tools/en/revolut_statement',
    'https://verif.tools/en/nets_statement',
    'https://verif.tools/en/chase_statement',
    'https://verif.tools/en/citibank_statement_pdf',
    'https://verif.tools/en/print_to_photo',
    'https://verif.tools/en/ssn',
    'https://verif.tools/en/custom_background',
    'https://verif.tools/en/code39_generator',
    'https://verif.tools/en/insurance_card_california',
    'https://verif.tools/en/photoshop_check',
    'https://verif.tools/en/credit-card',
    'https://verif.tools/en/code128_generator',
    'https://verif.tools/en/split_image',
    'https://verif.tools/en/drop_generator',
    'https://verif.tools/en/bank_check'
];
const slugs = urls.map(url => url.split('/').pop());

// Function to fetch generator information for a given slug
async function fetchGeneratorInfo(slug) {
  const url = `https://old.verif.tools/api/integration/generator-full-information/${slug}/`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': AUTH_HEADER_VALUE
    }
  });

  if (!response.ok) {
    throw new Error(`API call failed with status: ${response.status}`);
  }

  return response.json();
}

// Function to write the data to a file
function writeDataToFile(data) {
  fs.writeFile('generatorInfo.json', JSON.stringify(data, null, 2), (err) => {
    if (err) throw err;
    console.log('Data written to file');
  });
}

// Main function to loop over all slugs and fetch their information
async function fetchAllGeneratorInfo() {
  try {
    const allGeneratorInfo = [];
    for (const slug of slugs) {
      console.log(`Fetching info for: ${slug}`);
      const info = await fetchGeneratorInfo(slug);
      allGeneratorInfo.push(info);
      console.log(`Fetched info for: ${slug}`);
    }
    writeDataToFile(allGeneratorInfo);
  } catch (error) {
    console.error(error);
  }
}

fetchAllGeneratorInfo();
