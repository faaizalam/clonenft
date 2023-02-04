// import { useNavigate, useParams } from "react-router-dom";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Icons from "../../icons/icon";
import Attribute from "../../../component/ProjectDetails/Attribute/Attribute";
import AttributeLink from "../../../component/ProjectDetails/AttributeLink/AttributeLink";
import AttributesBox from "../../../component/ProjectDetails/AttributesBox/AttributesBox";
import classes from "./ProjectDetails.module.scss";
import { useEffect, useState } from "react";
import moment from "moment";
import { TwitterShareButton } from "react-share";
import parse from "html-react-parser";
import { BASEURL } from "../../../config/config";
import { useDispatch } from "react-redux";
import { fetchProjects } from "../../../redux/projects";
import Image from "next/image";

const ProjectDetails = () => {
  const { theme } = useSelector((state) => state.theme);
  const { projects } = useSelector((state) => state.Projects);
  const router = useRouter();

  const [isLoading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProjects()).finally(() => setLoading(false));
  }, [dispatch]);

  const heading = router.query.homeproid?.replace(/-/g, " ");
  const [selectedProject, setSelectedProject] = useState({
    projectType: [],
    mintStatus: {},
    status: {},
  });

  let styleClasses = classes.Project;

  if (theme === "light") {
    styleClasses = [styleClasses, classes.Light].join(" ");
  }

  const getProjectMintDate = (date) => {
    if (date === undefined) {
      return "N/A";
    }
    return moment.unix(date).format("ddd, MMM Do y, hh:mm A");
  };

  const getProjectMintDateUTC = (date) => {
    if (date === undefined) {
      return "N/A";
    }
    return moment.unix(date).utc().format("dd, MMM Do y, hh:mm A");
  };

  const structureNumber = (number) => {
    if (!number) return;
    return Math.floor(number)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  let mintStatusHeader = null;

  if (
    selectedProject &&
    selectedProject.projectType &&
    selectedProject.projectType.some(({ name }) =>
      name.toLowerCase().includes("nfts")
    )
  ) {
    mintStatusHeader = (
      <small className={classes.HeaderStatus}>
        {/* <span>
              <Icon name="status" />
            </span> */}
        {selectedProject.mintStatus
          ? `Mint: ${selectedProject.mintStatus.name}`
          : ""}
      </small>
    );
  }

  useEffect(() => {
    if (projects) {
      const foundProject = projects.find((project) => {
        return heading.toLocaleLowerCase() === project.name.toLocaleLowerCase();
      });
      if (foundProject === undefined) {
        return router.push("/home");
      }

      setSelectedProject(foundProject);
    }
  }, [projects, heading, router]);

  const {
    mintStatus,
    mintQuantity,
    quantityDetails,
    publicMintPrice,
    ebPrice,
    whitelistMintPrice,
    whitelistDetails,
    whitelistMintDate,
    mintCloseDate,
    publicMintDate,
    rarity,
    utility,
    utilityDetails,
    staking,
    stakingDetails,
    nftContract,
    tokenomics,
    token,
    tokenContract,
    dao,
    daoDetails,
    nftContractDetails,
  } = selectedProject || {};

  const isTechnicalDetailsExist =
    rarity ||
    utility ||
    utilityDetails ||
    staking ||
    stakingDetails ||
    nftContract ||
    tokenomics ||
    token ||
    tokenContract ||
    dao ||
    daoDetails;

  const isMintDetailsExist =
    mintStatus ||
    mintQuantity ||
    quantityDetails ||
    publicMintPrice ||
    ebPrice ||
    publicMintDate ||
    whitelistMintPrice ||
    whitelistDetails ||
    whitelistMintDate ||
    mintCloseDate;

  const isStatsExist =
    nftContractDetails &&
    Object.keys(nftContractDetails).some((key) => !!nftContractDetails[key]);
  return (
    <div className={styleClasses}>
      {isLoading && <div className="circle-loader"></div>}
      <div className={classes.ProjectHeader}>
        {/* <div className={classes.HeaderDetails}>
          <h5>{selectedProject.name}</h5>
          {mintStatusHeader}
        </div> */}
        <TwitterShareButton
          title={`Check out ${selectedProject.name} on CroSader!

`}
          hashtags={["crofam", "cro", "CronosNFT", "CroSader"]}
          url={router.asPath}
          className={classes.Bookmark}
        >
          <Icons name="twitter" />
        </TwitterShareButton>
      </div>
      <div className="p-4 md:flex">
      <div className="md:w-[30%] flex flex-col items-center md:ml-[30px] ">
      <div>
              {/* // `${BASEURL}/projects/${project._id}/image` */}
              {selectedProject._id && (
                <>
                  <img
                    classString="md:w-full mb-3 rounded"
                    src={`${BASEURL}/projects/${selectedProject._id}/image`}
                    alt={heading}
                  />
                  <h3 className="text-center"> {selectedProject.name}</h3>
                  <p className="text-center">{mintStatusHeader}</p>
                </>
              )}
            </div>
            <p className="flex-wrap text-center">
              {selectedProject.description &&
                parse(selectedProject.description)}
            </p>
          </div>
          <div className="md:w-[70%] md:flex md:flex-wrap items-center md:justify-center ">
      {isMintDetailsExist && (
         <div className="md:w-[45%] md:mr-7">
        <AttributesBox heading="Mint Details">
          {selectedProject.mintStatus && (
            <Attribute
              name="Mint Status"
              value={selectedProject.mintStatus.name}
            />
          )}
          {selectedProject.mintQuantity && (
            <Attribute name="Quantity" value={selectedProject.mintQuantity} />
          )}
          {selectedProject.quantityDetails && (
            <Attribute
              name="Quantity Details"
              value={selectedProject.quantityDetails}
            />
          )}
          {selectedProject.publicMintPrice && (
            <Attribute
              name="Public Mint $CRO"
              value={selectedProject.publicMintPrice}
            />
          )}
          {selectedProject.ebPrice && (
            <Attribute
              name="Ebisu’s Bay $CRO"
              value={selectedProject.ebPrice}
            />
          )}
          {!!selectedProject.whitelistMintPrice && (
            <Attribute
              name="Whitelist Mint $CRO"
              value={selectedProject.whitelistMintPrice}
            />
          )}
          {!!selectedProject.whitelistDetails && (
            <Attribute
              name="Whitelist Details"
              value={selectedProject.whitelistDetails}
            />
          )}
          {!!selectedProject.whitelistMintDate && (
            <Attribute
              name="WL Mint Date (Local)"
              value={getProjectMintDate(selectedProject.whitelistMintDate)}
            />
          )}
          {!!selectedProject.whitelistMintDate && (
            <Attribute
              name="WL Mint Date (UTC)"
              value={getProjectMintDateUTC(selectedProject.whitelistMintDate)}
            />
          )}
          {!!selectedProject.publicMintDate && (
            <Attribute
              name="Mint Date (Local)"
              value={getProjectMintDate(selectedProject.publicMintDate)}
            />
          )}
          {!!selectedProject.publicMintDate && (
            <Attribute
              name="Mint Date (UTC)"
              value={getProjectMintDateUTC(selectedProject.publicMintDate)}
            />
          )}
          {!!selectedProject.mintCloseDate && (
            <Attribute
              name="Mint Close Date (Local)"
              value={getProjectMintDate(selectedProject.mintCloseDate)}
            />
          )}
          {!!selectedProject.mintCloseDate && (
            <Attribute
              name="Mint Close Date (UTC)"
              value={getProjectMintDateUTC(selectedProject.mintCloseDate)}
            />
          )}
        </AttributesBox>
        </div>
      )}
      {isTechnicalDetailsExist && (
         <div className="md:w-[45%]">
        <AttributesBox heading="Technicals">
          {selectedProject.rarity && (
            <Attribute name="Rarity" value={selectedProject.rarity} />
          )}
          {selectedProject.utility && (
            <Attribute name="Utility" value={selectedProject.utility} />
          )}
          {selectedProject.utilityDetails && (
            <Attribute
              name="Utility Details"
              value={selectedProject.utilityDetails}
            />
          )}
          {selectedProject.staking && (
            <Attribute name="Staking" value={selectedProject.staking} />
          )}
          {selectedProject.stakingDetails && (
            <Attribute
              name="Staking Details"
              value={selectedProject.stakingDetails}
            />
          )}
          {selectedProject.nftContract && (
            <AttributeLink
              contractLink
              name="NFT Contract Address"
              link={selectedProject.nftContract}
            />
          )}
          {selectedProject.tokenomics && (
            <Attribute name="Tokenomics" value={selectedProject.tokenomics} />
          )}
          {selectedProject.token && (
            <Attribute name="Token" value={selectedProject.token} />
          )}
          {selectedProject.tokenContract && (
            <AttributeLink
              contractInfo
              name="Token Contract"
              link={selectedProject.tokenContract}
            />
          )}
          {selectedProject.dao && (
            <Attribute name="DAO" value={selectedProject.dao} />
          )}
          {selectedProject.daoDetails && (
            <Attribute name="DAO Details" value={selectedProject.daoDetails} />
          )}
        </AttributesBox>
        </div>
      )}
      {isStatsExist && (
         <div className="md:w-[45%] md:mr-7">
        <AttributesBox
          heading="Ebisu's Bay Live Stats"
          subText=" (Updates every 5 minutes)"
        >
          {selectedProject?.nftContractDetails?.floorPrice && (
            <Attribute
              name="Floor Price"
              value={`${structureNumber(
                selectedProject.nftContractDetails.floorPrice
              )} CRO`}
            />
          )}
          {selectedProject?.nftContractDetails?.totalVolume && (
            <Attribute
              name="Total Volume"
              value={`${structureNumber(
                selectedProject.nftContractDetails.totalVolume
              )} CRO`}
            />
          )}
          {selectedProject?.nftContractDetails?.numberActive && (
            <Attribute
              name="Active Listings"
              value={structureNumber(
                selectedProject.nftContractDetails.numberActive
              )}
            />
          )}
          {selectedProject?.nftContractDetails?.numberOfSales && (
            <Attribute
              name="Number of sales"
              value={structureNumber(
                selectedProject.nftContractDetails.numberOfSales
              )}
            />
          )}
          {!!selectedProject?.nftContractDetails?.totalRoyalties && (
            <Attribute
              name="Total Royalties"
              value={`${structureNumber(
                selectedProject.nftContractDetails.totalRoyalties
              )} CRO`}
            />
          )}
          {selectedProject?.nftContractDetails?.averageSalePrice && (
            <Attribute
              name="Average Sale Price"
              value={`${structureNumber(
                selectedProject.nftContractDetails.averageSalePrice
              )} CRO`}
            />
          )}
          
        </AttributesBox>
        </div>
      )}
       <div className="md:w-[45%]">
      <AttributesBox heading="Socials">
        {selectedProject.websiteLink && (
          <AttributeLink name="Website" link={selectedProject.websiteLink} />
        )}
        {selectedProject.twitterLink && (
          <AttributeLink name="Twitter" link={selectedProject.twitterLink} />
        )}
        {selectedProject.discordLink && (
          <AttributeLink name="Discord" link={selectedProject.discordLink} />
        )}
        {selectedProject.telegramLink && (
          <AttributeLink name="Telegram" link={selectedProject.telegramLink} />
        )}
        {selectedProject.lootpadLink && (
          <AttributeLink name="Lootpad" link={selectedProject.lootpadLink} />
        )}
        {selectedProject.whitePaperLink && (
          <AttributeLink
            name="Whitepaper"
            link={selectedProject.whitePaperLink}
          />
        )}
        {selectedProject.tiktokLink && (
          <AttributeLink name="TikTok" link={selectedProject.tiktokLink} />
        )}
        {selectedProject.instagramLink && (
          <AttributeLink
            name="Instagram"
            link={selectedProject.instagramLink}
          />
        )}
        {selectedProject.ebLink && (
          <AttributeLink name="Ebisu's Bay" link={selectedProject.ebLink} />
        )}
        {selectedProject.agoraLink && (
          <AttributeLink name="Agora" link={selectedProject.agoraLink} />
        )}
        {selectedProject.openSea && (
          <AttributeLink name="OpenSea" link={selectedProject.openSea} />
        )}
        {selectedProject.projectEmail && (
          <AttributeLink
            name="Project Email"
            link={`mailto:${selectedProject.projectEmail}`}
          />
        )}
      </AttributesBox>
      </div>
      
    </div>
    </div>
    </div>
  );
};

export default ProjectDetails;
