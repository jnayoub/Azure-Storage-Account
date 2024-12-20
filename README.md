Preview at https://jayoub-azure-storage-account-6510d8946967.herokuapp.com/

Use File ID:Admin Password combo SLXrLJL:5yf0b9s to preview Admin page or upload file. 

Resource Stack
 - NodeJS - Client and Server Code
 - MongoDB Database - For Metadata and Uplaod DB
 - Azure Storage Account - For Cloud Storage

Usage
- Download
  -- Enter FileID to find the file
  
  -- If Download is available click Download to download file.
  
  -- Password may be required during upload
  
  -- Files can expire or reach download limit which blocks download.
  
- Upload
  -- Only allows single file upload.
  
  -- All uploads require:
  
    a user friendly name (the filename used when downloading the file)
  
    a collection name
  
  -- Optional Fields
  
    Admin Password (if not set, a random one will be generated).
  
    Tags (if not set, no tags included)
  
    Download password (if not set, no password required).
  
    How many days before the file expires (if not set, default to 30 days)
  
    How many times the file can be downloaded (non unique, if not set, download limit is unlimited).
  
  -- After upload, you can export the file details.
  
- List
  
  -- Here you can see all files, their user friendly file name, tags and collections.
  
  -- Filter by filename, tags, collections.
  
  -- FileID needed to find the file for download.
  
- Admin
  
  -- Shows all metadata for the file
  
    -- How many times downloaded, expiration date, tags, collection
  
    -- Delete file from mongodb (will no longer be possible to download via webapp).
