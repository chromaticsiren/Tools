#!/bin/bash

NO_ARGS=0

if [ $# -eq "$NO_ARGS" ] # check for no arguments
then
	echo "Chef Initiated: `basename $0` Invoking script in background process." > /opt/software/deployment/POWERPLM/db_DEV3_Spinner.txt
	echo
			nohup /opt/software/deployment/POWERPLM/db-3DSPACE-DEV3.sh BackgroundExecution >> /opt/software/deployment/POWERPLM/db_DEV3_Spinner.txt 2>&1  &
			echo " Spinner Script Initiated - Chef closing " >> /opt/software/deployment/POWERPLM/db_DEV3_Spinner.txt
	exit
fi

if [ `hostname` = "vdcald04144" ]; then

sleep 10

touch /opt/software/deployment/POWERPLM/db-deploying

BUILD_NUM=`ls /opt/software/deployment/POWERPLM/version_deployed/db* | cut -d- -f2`
echo BUILD_NUM=${BUILD_NUM}

START=$(date +%s)

# Copy spinner tar
rm -rf /tmp/enovia
mkdir /tmp/enovia

# Code to set permissions
chmod 777 /tmp/enovia/

cp /opt/software/deployment/POWERPLM/powerplm_spinner.tar.gz /tmp/enovia
cd /tmp/enovia
gunzip powerplm_spinner.tar.gz
tar -xvf powerplm_spinner.tar

sleep 10

# Code to rename the folder
mv powerplm_spinner powerplm

# Code to set permissions
chmod -R 777 /tmp/enovia/powerplm
chown -R enovia:enovia /tmp/enovia/powerplm
cd /tmp/enovia/powerplm

# set environment
export app_id=POWERPLM
export vcs_tag=Dev_1_1
export env_tag=DEV3
export path_location=/opt/software/enovia/V6R2017xHF6_RHEL/powerplm/scripts:/usr/lib:/usr/xpg4/bin
export spinner_credentials=/export/home1/enovia/POWERPLM-DEV3/ccm_bin/enovia.txt
export now=$(date +"%Y%m%d")
export zipped_spinner_logs="${now}_${app_id}_${vcs_tag}_${env_tag}.zip"
export FILE=/tmp/enovia/powerplm/run_spinner.log
export spinner_location=/tmp/enovia/${app_id}

export mail_from=PWT.OpsPortal@ge.com

export build_team=power.plm.ccm.team@ge.com,,PowerPLM-build-notifications@ge.com,Somaaditya.Dasika@ge.com,Sai.Sreemanth@ge.com,Pawan.Gujrathi@ge.com,Satyamadhukumar.Kokkerametla@ge.com,Anusha.Lakkamraju@ge.com,Subash.Sammeta@ge.com
export powerplm_notify=power.plm.ccm.team@ge.com,PowerPLM-build-notifications@ge.com,Somaaditya.Dasika@ge.com,Sai.Sreemanth@ge.com,Pawan.Gujrathi@ge.com,Satyamadhukumar.Kokkerametla@ge.com,Anusha.Lakkamraju@ge.com,Subash.Sammeta@ge.com


# Code to send email about build starting
echo "Spinner Build is starting on ${app_id}-${env_tag}, please logout." | mailx -r "${mail_from}" -s "Automated Build: PW Spinner Deployment Notification (${app_id}-${env_tag})" ${powerplm_notify}

# Code to copy the properties to ematrix locations
while read props_line; do if [ -n "$props_line" ]; then echo -e "Copying Properties to $props_line"; cp ./properties/* $props_line/; fi; done < props_server_locations.txt;\

# Code to copy the jars to ematrix locations
while read libs_line; do if [ -n "$libs_line" ]; then echo -e "Copying Properties to $libs_line"; cp ./library_files/* $libs_line/; fi; done < libs_server_locations.txt;\

# Code to run the spinner shell script
echo "Executing shell script in ${spinner_location} with parameters: ${app_id} ${vcs_tag} ${env_tag} ${path_location}"
find . -type f | grep -v '\.pdf' | grep -v '\.zip' | xargs -I {} dos2unix -437 {} {}; chmod -R 777 ${spinner_location};./run_spinner.sh ${app_id} ${vcs_tag} ${env_tag} ${path_location} ${spinner_credentials} > run_spinner.log 2>&1;zip -r ${zipped_spinner_logs} log_files run_spinner.log;\

# Code to set permissions
chmod -R 777 /tmp/enovia/powerplm
chown -R enovia:enovia /tmp/enovia/powerplm

echo "This is an automated notification.  Do not reply to this email."| mailx -r "${mail_from}" -s "Automated Build: PW Spinner Deployment Notification (${app_id}-${env_tag})" -a $zipped_spinner_logs ${build_team}

echo "Spinner Build is complete on ${app_id}-${env_tag}" | mailx -r "${mail_from}" -s "Automated Build: PW Spinner Deployment Notification (${app_id}-${env_tag})" ${powerplm_notify}


END=$(date +%s)
DIFF=$(( ${END} - ${START} ))

curl -X POST "http://vdcglp00678.ics.cloud.ge.com:7000/jenkins/job/PLM-MANUAL-UPDATE-DEPLOYMENT-INFO/build/" --data json='{"parameter": [{"name":"Application", "value":"'"${app_id}"'"}, {"name":"Environment", "value":"'"${env_tag}"'"}, {"name":"Component", "value":"db"}, {"name":"Build_Num", "value":"'"${BUILD_NUM}"'"}, {"name":"Duration", "value":"'"${DIFF}"'"}]}'

rm /opt/software/deployment/POWERPLM/db-deploying || true

fi