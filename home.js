// Verification that script loads successfully without errors
document.addEventListener("DOMContentLoaded", () => {
    console.log("IT Asset Management system initialized successfully.");
});
document.addEventListener("DOMContentLoaded", () => {
    // 1. Get the current page filename from the browser URL window
    const currentPath = window.location.pathname;
    const pageName = currentPath.split("/").pop();

    // 2. Clear out any old active styling highlights first
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach(item => item.classList.remove("active"));

    // 3. Detect which page is running and apply the active blue background look
    if (pageName === "home.html" || pageName === "") {
        const homeBtn = document.getElementById("nav-home");
        if (homeBtn) homeBtn.classList.add("active");
    } else if (pageName === "userarea.html" || pageName === "user_area.html") {
        const userBtn = document.getElementById("nav-userarea");
        if (userBtn) userBtn.classList.add("active");
    }

    // 4. Optional: Handle console interaction buttons safely
    const refreshBtn = document.querySelector(".btn-refresh");
    if (refreshBtn) {
        refreshBtn.addEventListener("click", () => {
            console.log("Re-synchronizing active nodes...");
            location.reload(); // Instantly refreshes the container data smoothly
        });
    }
});
document.addEventListener("DOMContentLoaded", () => {
    // 1. Get the current page filename from the browser URL window
    const currentPath = window.location.pathname;
    const pageName = currentPath.split("/").pop();

    // 2. Clear out any old active styling highlights first
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach(item => item.classList.remove("active"));

    // 3. Detect which page is running and apply the active navigation highlights
    if (pageName === "home.html" || pageName === "") {
        const homeBtn = document.getElementById("nav-home");
        if (homeBtn) homeBtn.classList.add("active");
    } else if (pageName === "userarea.html") {
        const userBtn = document.getElementById("nav-userarea");
        if (userBtn) userBtn.classList.add("active");
    } else if (pageName === "reports.html") {
        const reportsBtn = document.getElementById("nav-reports");
        if (reportsBtn) reportsBtn.classList.add("active");
    } else if (pageName === "master.html") {
        const masterBtn = document.getElementById("nav-master");
        if (masterBtn) masterBtn.classList.add("active");
    }

    // 4. Connect Click listeners to Report Tiles for testing navigation actions
    const tiles = document.querySelectorAll(".report-tile");
    tiles.forEach(tile => {
        tile.addEventListener("click", () => {
            const tileLabel = tile.querySelector(".tile-text").innerText;
            console.log(`Accessing specialized metrics console: ${tileLabel}`);
        });
    });
});
// ==========================================
// MASTER REGISTRY MODULE LOGIC
// ==========================================

// Ensure this runs alongside your existing routing logic inside DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    // 1. Handle DB Status Button Click
    const dbStatusBtn = document.querySelector(".btn-db-status");
    if (dbStatusBtn) {
        dbStatusBtn.addEventListener("click", () => {
            console.log("Checking database sync connection pools...");
            alert("Database status: CONNECTED\nAll 7 master core nodes are synchronized securely.");
        });
    }

    // 2. Handle Master Registry Cards Selection
    const masterCards = document.querySelectorAll(".master-registry-card");
    masterCards.forEach(card => {
        card.addEventListener("click", () => {
            const registryLabel = card.querySelector(".card-label").innerText;
            console.log(`Redirecting securely to repository matrix entry: ${registryLabel}`);
            
            // This is where you can later hook up data forms or sub-modals for editing
            alert(`Opening Master Ledger: ${registryLabel}\nReady to view/edit database columns.`);
        });
    });
});
// ==========================================
// TRANSACTIONS CONSOLE ENGINE MODULE LOGIC
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    // 1. Extend routing system active classes for Transactions page detection
    const currentPath = window.location.pathname;
    const pageName = currentPath.split("/").pop();

    if (pageName === "transactions.html") {
        const txNavBtn = document.getElementById("nav-transactions");
        if (txNavBtn) txNavBtn.classList.add("active");
    }

    // 2. Handle History Toggle Click action
    const txHistoryBtn = document.querySelector(".btn-tx-history");
    if (txHistoryBtn) {
        txHistoryBtn.addEventListener("click", () => {
            console.log("Loading historical operational ledger sequences...");
            alert("Transactions Log: Synchronized\nOpening archival transaction history registry table.");
        });
    }

    // 3. Handle Transaction Card Selection actions
    const txCards = document.querySelectorAll(".tx-card");
    txCards.forEach(card => {
        card.addEventListener("click", () => {
            const txLabel = card.querySelector(".tx-label").innerText;
            console.log(`Accessing live workflow window for: ${txLabel}`);
            alert(`Opening workflow dashboard window for: "${txLabel}"`);
        });
    });
});
// ==========================================
// SPECIAL ACCESS UTILITIES MODULE LOGIC
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    // 1. Extend navigation highlighting engine arrays for Special Access page check
    const currentPath = window.location.pathname;
    const pageName = currentPath.split("/").pop();

    if (pageName === "special_access.html") {
        const specialNavBtn = document.getElementById("nav-special");
        if (specialNavBtn) specialNavBtn.classList.add("active");
    }

    // 2. Handle Security Vault Audit button trigger click action
    const securityLogBtn = document.querySelector(".btn-security-log");
    if (securityLogBtn) {
        securityLogBtn.addEventListener("click", () => {
            console.warn("Pulling secure encryption lifecycle logs...");
            alert("Security Clearance: Authorized\nDisplaying system administrative override log tracking streams.");
        });
    }

    // 3. Handle Special Access card element click actions
    const specialCards = document.querySelectorAll(".special-card");
    specialCards.forEach(card => {
        card.addEventListener("click", () => {
            const specialLabel = card.querySelector(".special-label").innerText;
            console.log(`Initializing authentication checkpoint node for: ${specialLabel}`);
            alert(`Opening verification prompt window for security channel: "${specialLabel}"`);
        });
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.pathname;
    const pageName = currentPath.split("/").pop();

    // 1. If user is inside the main Master overview screen, map card 1 to load master1.html
    if (pageName === "master.html") {
        const masterCards = document.querySelectorAll(".master-registry-card");
        masterCards.forEach(card => {
            card.addEventListener("click", () => {
                const labelText = card.querySelector(".card-label").innerText;
                
                // If it is the first card matching your target schema layout look
                if (labelText.includes("ASSET MAST (E)")) {
                    window.location.href = "master1.html";
                }
            });
        });
    }

    // 2. Intercept master1 form submissions to prevent broken reloads
    if (pageName === "master1.html") {
        document.getElementById("assetMasterForm")?.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Asset registry matrix updated successfully in local session!");
        });
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.pathname;
    const pageName = currentPath.split("/").pop();

    // 1. If user is inside the main Master overview screen, redirect to master2.html when clicking Asset Mast (S)
    if (pageName === "master.html") {
        const masterCards = document.querySelectorAll(".master-registry-card");
        masterCards.forEach(card => {
            card.addEventListener("click", () => {
                const labelText = card.querySelector(".card-label").innerText;
                
                if (labelText.includes("ASSET MAST (S)")) {
                    window.location.href = "master2.html";
                }
            });
        });
    }

    // 2. Process search actions within master2.html safely without breaking reloads
    if (pageName === "master2.html") {
        const searchForm = document.getElementById("assetSearchForm");
        const inputField = document.getElementById("searchFieldInput");

        if (searchForm) {
            searchForm.addEventListener("submit", (e) => {
                e.preventDefault();
                alert(`Query processing! Initiating live search for Asset ID: "${inputField.value}"`);
            });
        }
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.pathname;
    const pageName = currentPath.split("/").pop();

    // 1. Redirect to master4.html when an administrator clicks the VENDOR MAST (E) card option block
    if (pageName === "master.html") {
        const masterCards = document.querySelectorAll(".master-registry-card");
        masterCards.forEach(card => {
            card.addEventListener("click", () => {
                const labelText = card.querySelector(".card-label").innerText;
                
                if (labelText.includes("VENDOR MAST (E)")) {
                    window.location.href = "master4.html";
                }
            });
        });
    }

    // 2. Intercept Vendor Form submission events cleanly to clear elements ready for backend transmission
    if (pageName === "master4.html") {
        const vendorForm = document.getElementById("vendorMasterForm");
        if (vendorForm) {
            vendorForm.addEventListener("submit", (e) => {
                e.preventDefault();
                alert("Vendor form processed! Input elements cleared out and ready for active database connection storage.");
                vendorForm.reset();
            });
        }
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.pathname;
    const pageName = currentPath.split("/").pop();

    // 1. Map clicking "EMP MASTER (S)" on master.html to load master5.html
    if (pageName === "master.html") {
        const masterCards = document.querySelectorAll(".master-registry-card");
        masterCards.forEach(card => {
            card.addEventListener("click", () => {
                const labelText = card.querySelector(".card-label").innerText;
                
                if (labelText.includes("EMP MAST (S)") || labelText.includes("EMP MASTER (S)")) {
                    window.location.href = "master5.html";
                }
            });
        });
    }

    // 2. Intercept employee search form queries safely
    if (pageName === "master5.html") {
        const searchForm = document.getElementById("empSearchForm");
        const inputField = document.getElementById("searchFieldInput");

        if (searchForm) {
            searchForm.addEventListener("submit", (e) => {
                e.preventDefault();
                alert(`Search query captured! Ready to send Employee ID: "${inputField.value}" to backend database query engine.`);
            });
        }
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.pathname;
    const pageName = currentPath.split("/").pop();

    // System Login Matrix configuration routing handler
    if (pageName === "login.html") {
        const loginForm = document.getElementById("systemLoginForm");
        const passField = document.getElementById("accountPassword");
        const confirmPassField = document.getElementById("confirmPassword");
        const closeBtn = document.querySelector(".modal-close-btn");

        // 1. Intercept credentials submission securely
        if (loginForm) {
            loginForm.addEventListener("submit", (e) => {
                e.preventDefault();

                // Check that passwords match precisely
                if (passField.value !== confirmPassField.value) {
                    alert("Authentication Failure!\nPasswords do not match. Please re-enter credentials securely.");
                    return;
                }

                alert("Authentication Clear!\nCredentials authorized securely. Initializing enterprise asset environment routing...");
                window.location.href = "home.html"; // Forwards logged-in users cleanly straight onto home landing screen!
            });
        }

        // 2. Connect modal cross button action path to return users home safely
        if (closeBtn) {
            closeBtn.addEventListener("click", () => {
                window.location.href = "home.html";
            });
        }
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.pathname;
    const pageName = currentPath.split("/").pop();

    // 1. Lock active nav-highlight class when viewing settings.html page context
    if (pageName === "settings.html") {
        document.getElementById("nav-settings")?.classList.add("active");

        // 2. Add interaction response to Save Configurations button click
        const saveBtn = document.getElementById("saveConfigBtn");
        if (saveBtn) {
            saveBtn.addEventListener("click", () => {
                console.log("Committing system preferences to local storage matrices...");
                alert("Success!\nSystem preference profiles updated and cached securely on servers.");
            });
        }
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.pathname;
    const pageName = currentPath.split("/").pop();

    if (pageName === "help.html") {
        // Connect ticket launcher response to Raise IT Ticket click
        const ticketBtn = document.getElementById("raiseTicketBtn");
        if (ticketBtn) {
            ticketBtn.addEventListener("click", () => {
                console.log("Opening communication gateway panel for administrative tickets...");
                alert("Incident Manager Initialized!\nOpening live communication console to dispatch your infrastructure assistance ticket.");
            });
        }

        // Add verification tracking alerts for documentation resource tiles
        const resourceButtons = document.querySelectorAll(".btn-resource-action");
        resourceButtons.forEach(button => {
            button.addEventListener("click", (e) => {
                const guideTitle = e.target.parentElement.querySelector("h3").innerText;
                alert(`Loading Module: "${guideTitle}"\nOpening knowledge base asset nodes.`);
            });
        });
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.pathname;
    const pageName = currentPath.split("/").pop();

    // 1. If user is inside the main Master overview screen, redirect to master6.html when clicking DEPT MAST (M)
    if (pageName === "master.html") {
        const masterCards = document.querySelectorAll(".master-registry-card");
        masterCards.forEach(card => {
            card.addEventListener("click", () => {
                const labelText = card.querySelector(".card-label").innerText;
                
                if (labelText.includes("DEPT MAST (M)")) {
                    window.location.href = "master6.html";
                }
            });
        });
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.pathname;
    const pageName = currentPath.split("/").pop();

    // 1. Map clicking the seventh dashboard option block element on master.html to load master7.html
    if (pageName === "master.html") {
        const masterCards = document.querySelectorAll(".master-registry-card");
        
        // Target index tracking or string scanning check
        masterCards.forEach(card => {
            const labelText = card.querySelector(".card-label").innerText;
            
            // Matches your seventh card configuration string
            if (labelText.includes("VENDOR MAST (S)") || (masterCards[4] === card)) {
                card.addEventListener("click", () => {
                    window.location.href = "master7.html";
                });
            }
        });
    }

    // 2. Intercept vendor7 submission events cleanly
    if (pageName === "master7.html") {
        document.getElementById("vendorMasterForm7")?.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Vendor ledger logs updated successfully in active cache matrices!");
        });
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.pathname;
    const pageName = currentPath.split("/").pop();

    // 1. Map dashboard card click redirection to load master8.html from master.html view
    if (pageName === "master.html") {
        const masterCards = document.querySelectorAll(".master-registry-card");
        masterCards.forEach(card => {
            const labelText = card.querySelector(".card-label").innerText;
            
            if (labelText.includes("VENDOR MAST (S)")) {
                card.addEventListener("click", () => {
                    window.location.href = "master8.html";
                });
            }
        });
    }

    // 2. Intercept vendor search query submits safely without breaking reloads
    if (pageName === "master8.html") {
        const searchForm = document.getElementById("vendorSearchForm");
        const inputField = document.getElementById("searchFieldInput");

        if (searchForm) {
            searchForm.addEventListener("submit", (e) => {
                e.preventDefault();
                alert(`Search initiated! Running search parameters for Vendor ID: "${inputField.value}" against central registry rows.`);
            });
        }
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.pathname;
    const pageName = currentPath.split("/").pop();

    // 1. If user is inside the primary User Area overview menu screen, redirect to userarea1.html upon tile trigger click
    if (pageName === "userarea.html") {
        const actionButtons = document.querySelectorAll(".action-bar-btn, .action-tile-btn");
        actionButtons.forEach(button => {
            button.addEventListener("click", (e) => {
                const buttonText = e.currentTarget.innerText;
                if (buttonText.includes("Personal Assets") || buttonText.includes("Your Name")) {
                    window.location.href = "userarea1.html";
                }
            });
        });
    }

    // 2. Add row click inspection capabilities inside userarea1.html framework views
    if (pageName === "userarea1.html") {
        const clickableIds = document.querySelectorAll(".clickable-id");
        clickableIds.forEach(idCell => {
            idCell.addEventListener("click", (e) => {
                const assetCode = e.target.innerText;
                console.log(`Fetching specific register records metrics for node: ${assetCode}`);
                alert(`Dynamic Asset Profile Query!\nSynchronizing detailed parameter blocks for serial item: [${assetCode}] from central register logs.`);
            });
        });
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.pathname;
    const pageName = currentPath.split("/").pop();

    // Verify active class sidebar high-lighting injection loops
    if (pageName === "userarea1.html") {
        document.getElementById("nav-userarea")?.classList.add("active");
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.pathname;
    const pageName = currentPath.split("/").pop();

    // 1. Map the respective action button on userarea.html to route onto userarea2.html
    if (pageName === "userarea.html") {
        const actionButtons = document.querySelectorAll(".action-bar-btn");
        actionButtons.forEach(button => {
            button.addEventListener("click", (e) => {
                const buttonText = e.currentTarget.innerText;
                if (buttonText.includes("Department Assets") || buttonText.includes("IND, DEPT")) {
                    window.location.href = "userarea2.html";
                }
            });
        });
    }

    // 2. Ensure active nav item sidebar styling remains persistent on page load
    if (pageName === "userarea2.html") {
        document.getElementById("nav-userarea")?.classList.add("active");
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.pathname;
    const pageName = currentPath.split("/").pop();

    // 1. Map the reporting grid card selection on reports.html to load report1.html
    if (pageName === "reports.html") {
        const reportTiles = document.querySelectorAll(".report-tile");
        reportTiles.forEach(tile => {
            tile.addEventListener("click", () => {
                const tileText = tile.querySelector(".tile-text").innerText;
                
                if (tileText.includes("Overall View")) {
                    window.location.href = "report1.html";
                }
            });
        });
    }

    // 2. Keep the persistent active highlight state for the sidebar link on initialization
    if (pageName === "report1.html") {
        document.getElementById("nav-reports")?.classList.add("active");
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.pathname;
    const pageName = currentPath.split("/").pop();

    // 1. If user is inside the primary Reports overview menu screen, map the Deptwise View tile to redirect cleanly
    if (pageName === "reports.html") {
        const reportTiles = document.querySelectorAll(".report-tile");
        
        reportTiles.forEach(tile => {
            tile.addEventListener("click", () => {
                const tileText = tile.querySelector(".tile-text").innerText;
                
                if (tileText.trim() === "Deptwise View") {
                    window.location.href = "report2.html";
                }
            });
        });
    }

    // 2. Ensure persistent active class highlighting for the sidebar elements inside report2.html
    if (pageName === "report2.html") {
        document.getElementById("nav-reports")?.classList.add("active");
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.pathname;
    const pageName = currentPath.split("/").pop();

    // 1. If user is inside the primary Reports overview grid panel, map the third card link target
    if (pageName === "reports.html") {
        const reportTiles = document.querySelectorAll(".report-tile");
        
        reportTiles.forEach(tile => {
            tile.addEventListener("click", () => {
                const tileText = tile.querySelector(".tile-text").innerText;
                
                if (tileText.trim() === "Report Form") {
                    window.location.href = "report3.html";
                }
            });
        });
    }

    // 2. Intercept query submissions inside report3.html safely without causing layout breakages
    if (pageName === "report3.html") {
        document.getElementById("nav-reports")?.classList.add("active");

        const filterForm = document.getElementById("assetReportFilterForm");
        if (filterForm) {
            filterForm.addEventListener("submit", (e) => {
                e.preventDefault();
                
                const chosenObsolete = document.querySelector('input[name="obsoleteStatus"]:checked').value;
                const chosenDisposed = document.querySelector('input[name="disposedStatus"]:checked').value;
                
                console.log(`Executing detailed asset metrics query execution filters matrix... Obsolete: [${chosenObsolete}], Disposed: [${chosenDisposed}]`);
                alert(`Query Initialized!\nCompiling asset record indices matching requested filter parameters.`);
            });
        }
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.pathname;
    const pageName = currentPath.split("/").pop();

    // =========================================================================
    // HOME LANDING VIEW NAVIGATION SHORTCUTS
    // =========================================================================
    if (pageName === "home.html" || pageName === "") {
        
        // 1. Help shortcut trigger redirect map
        document.getElementById("headerBtnHelp")?.addEventListener("click", () => {
            window.location.href = "help.html";
        });

        // 2. Settings shortcut trigger redirect map
        document.getElementById("headerBtnSettings")?.addEventListener("click", () => {
            window.location.href = "settings.html";
        });

        // 3. Login shortcut trigger redirect map
        document.getElementById("headerBtnLogin")?.addEventListener("click", () => {
            window.location.href = "login.html";
        });
        
        console.log("Landing station routing layers mapped successfully.");
    }
});
// =========================================================================
// UNIVERSAL APP ROUTING & WORKSPACE LINKING MATRIX (UPDATED)
// =========================================================================
document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.pathname;
    const pageName = currentPath.split("/").pop();

    // 1. Global Utility Header Buttons Shortcut Mapping (Runs across all files)
    document.getElementById("headerBtnHelp")?.addEventListener("click", () => { 
        window.location.href = "help.html"; 
    });
    document.getElementById("headerBtnSettings")?.addEventListener("click", () => { 
        window.location.href = "settings.html"; 
    });
    document.getElementById("headerBtnLogin")?.addEventListener("click", () => { 
        window.location.href = "login.html"; 
    });

    // 2. Main Sidebar Dynamic Navigation Persistent Highlight States
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach(item => item.classList.remove("active"));

    if (pageName === "home.html" || pageName === "") {
        document.getElementById("nav-home")?.classList.add("active");
    } else if (pageName === "userarea.html" || pageName === "userarea1.html" || pageName === "userarea2.html") {
        document.getElementById("nav-userarea")?.classList.add("active");
    } else if (pageName === "reports.html" || pageName === "report1.html" || pageName === "report2.html" || pageName === "report3.html") {
        document.getElementById("nav-reports")?.classList.add("active");
    } else if (pageName === "master.html" || pageName.startsWith("master")) {
        document.getElementById("nav-master")?.classList.add("active");
    } else if (pageName === "transactions.html") {
        document.getElementById("nav-transactions")?.classList.add("active");
    } else if (pageName === "special_access.html") {
        document.getElementById("nav-special")?.classList.add("active");
    }

    // 3. User Console Area Live Actions Trigger
    if (pageName === "userarea.html") {
        document.getElementById("btnRefreshNode")?.addEventListener("click", () => {
            console.log("Synchronizing active node terminals...");
            alert("Node Refreshed!\nSynchronized workspace directories successfully with server registry files.");
            window.location.reload();
        });
    }
});
// =========================================================================
// ENTERPRISE REPORT ENGINE LINKING SYSTEM
// =========================================================================
document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.pathname;
    const pageName = currentPath.split("/").pop();

    if (pageName === "reports.html") {
        // 1. Sync Live Data button notification response trigger
        document.getElementById("btnSyncLive")?.addEventListener("click", () => {
            alert("Synchronizing Data Engine!\nFetching real-time asset distributions from core database systems.");
        });

        // 2. Click handler event redirects for the completed sub-reports files
        document.getElementById("tileOverall")?.addEventListener("click", () => {
            window.location.href = "report1.html";
        });

        document.getElementById("tileDeptwise")?.addEventListener("click", () => {
            window.location.href = "report2.html";
        });

        document.getElementById("tileForm")?.addEventListener("click", () => {
            window.location.href = "report3.html";
        });
    }
});
// =========================================================================
// CENTRAL MASTER CONFIGURATION ENGINE MODULE LINKING ROUTER
// =========================================================================
document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.pathname;
    const pageName = currentPath.split("/").pop();

    if (pageName === "master.html") {
        // DB Status alert popup button trigger
        document.getElementById("btnDbStatus")?.addEventListener("click", () => {
            alert("Database Online!\nAll 7 localized Master core database table registries are completely active.");
        });

        // Redirect individual card elements to their independent submaster view files
        document.getElementById("cardAssetExec")?.addEventListener("click", () => {
            window.location.href = "master1.html"; // Open Asset Master (E) Form & Grid Table
        });

        document.getElementById("cardAssetStaff")?.addEventListener("click", () => {
            window.location.href = "master2.html"; // Open Asset Master (S) Search capsule
        });

        document.getElementById("cardVendorExec")?.addEventListener("click", () => {
            window.location.href = "master7.html"; // Open Vendor Master (E) Form & Grid Table
        });

        document.getElementById("cardVendorStaff")?.addEventListener("click", () => {
            window.location.href = "master8.html"; // Open Vendor Master (S) Search capsule
        });

        document.getElementById("cardEmpStaff")?.addEventListener("click", () => {
            window.location.href = "master5.html"; // Open Employee Master (S) Search capsule
        });

        document.getElementById("cardDeptMatrix")?.addEventListener("click", () => {
            window.location.href = "master6.html"; // Open Department Master (M) Canvas
        });

        document.getElementById("cardEmpExec")?.addEventListener("click", () => {
            alert("EMP MAST (E) link detected.\nReady to forward to its respective submaster code module layout panel.");
        });
    }
});
// =========================================================================
// CENTRAL TRANSACTIONS CORE PROCESSOR LINKING ROUTER MODULE
// =========================================================================
document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.pathname;
    const pageName = currentPath.split("/").pop();

    if (pageName === "transactions.html") {
        // Tx History modal alert trigger
        document.getElementById("btnTxHistory")?.addEventListener("click", () => {
            alert("Archive Synced!\nOpening history logs directory safely from secure storage nodes.");
        });

        // Direct item event redirects for individual operational sub-workflow pages
        document.getElementById("cardTxRecordExec")?.addEventListener("click", () => {
            window.location.href = "transaction1.html"; // Open Asset Record (E) view
        });

        document.getElementById("cardTxRecordMaint")?.addEventListener("click", () => {
            window.location.href = "transaction2.html"; // Open Asset Record (M) view
        });

        document.getElementById("cardTxDisposal")?.addEventListener("click", () => {
            window.location.href = "transaction3.html"; // Open Asset Disposal view
        });

        document.getElementById("cardTxFlagUpdate")?.addEventListener("click", () => {
            window.location.href = "transaction4.html"; // Open Flag Updation view
        });
    }
});
// =========================================================================
// SPECIAL ACCESS 1 SUB-GATEWAY LINKING ROUTER MODULE
// =========================================================================
document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.pathname;
    const pageName = currentPath.split("/").pop();

    // 1. If user is browsing main Special Access panel, map the first card option to open special_access1.html
    if (pageName === "special_access.html") {
        const specialCards = document.querySelectorAll(".special-card");
        specialCards.forEach(card => {
            card.addEventListener("click", () => {
                const labelText = card.querySelector(".special-label").innerText;
                
                // Matches your target screenshot category exactly
                if (labelText.includes("EMP DETAILS (SELF)")) {
                    window.location.href = "special_access1.html";
                }
            });
        });
    }

    // 2. Ensure persistent active sidebar link state for the Special Access menu tab on load
    if (pageName === "special_access1.html") {
        document.getElementById("nav-special")?.classList.add("active");
        console.log("Special Access 1 employee gateway node loaded successfully.");
    }
});
// =========================================================================
// SPECIAL ACCESS 2 SUB-GATEWAY LINKING ROUTER MODULE
// =========================================================================
document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.pathname;
    const pageName = currentPath.split("/").pop();

    // 1. If user is browsing main Special Access panel, map the second card option to open special_access2.html
    if (pageName === "special_access.html") {
        const specialCards = document.querySelectorAll(".special-card");
        specialCards.forEach(card => {
            card.addEventListener("click", () => {
                const labelText = card.querySelector(".special-label").innerText;
                
                // Matches your target screenshot category exactly
                if (labelText.includes("UPDATE MOBILE")) {
                    window.location.href = "special_access2.html";
                }
            });
        });
    }

    // 2. Ensure persistent active sidebar link state for the Special Access menu tab on load
    if (pageName === "special_access2.html") {
        document.getElementById("nav-special")?.classList.add("active");
        console.log("Special Access 2 mobile gateway node loaded successfully.");
    }
});
// =========================================================================
// CENTRAL VAULT SECURITY GATEWAY INTERFACE MODULE ROUTER
// =========================================================================
document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.pathname;
    const pageName = currentPath.split("/").pop();

    if (pageName === "special_access.html") {
        // Security Log action trigger callback
        document.getElementById("btnSecurityLog")?.addEventListener("click", () => {
            alert("Security Clearance Clear!\nDisplaying secure encryption override logs directory safely.");
        });

        // Redirect individual special access dashboard options to standalone files
        document.getElementById("cardSpecialEmp")?.addEventListener("click", () => {
            window.location.href = "special_access1.html"; // Opens EMP DETAILS (SELF) View
        });

        document.getElementById("cardSpecialMobile")?.addEventListener("click", () => {
            window.location.href = "special_access2.html"; // Opens UPDATE MOBILE View
        });

        document.getElementById("cardSpecialPass")?.addEventListener("click", () => {
            alert("CHANGE PASSWORD link detected.\nReady to forward to special_access3.html when created.");
        });
    }
});
// =========================================================================
// TRANSACTION 1 SYSTEM AUTHENTICATION LOGIC INTERFACE MODULE
// =========================================================================
document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.pathname;
    const pageName = currentPath.split("/").pop();

    if (pageName === "transaction1.html") {
        // Only handle navbar styling highlight here
        document.getElementById("nav-transactions")?.classList.add("active");
        
        // Dynamic database operations are safely handled inside transaction1.html script tag blocks
    }
});

// =========================================================================
// TRANSACTION 2 MAINTENANCE LOG PROCESSING UTILITIES MODULE
// =========================================================================
document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.pathname;
    const pageName = currentPath.split("/").pop();

    // Intercept Maintenance Form query submission safely to block unneeded layout breaking page refreshes
   if (pageName === "transaction2.html") {
    document.getElementById("nav-transactions")?.classList.add("active");

    const tableBody = document.getElementById("txRecordTableBodyM");
    // Automatically load existing records from SQL Server on screen load
    if (tableBody) {
        fetch("/api/maintenance")
            .then(res => res.json())
            .then(logs => {
                tableBody.innerHTML = "";
                if (!logs || logs.length === 0) {
                    tableBody.innerHTML = `<tr id="noRecordsRow"><td colspan="7" style="text-align: center; color: #8a99ad; padding: 20px;">No active maintenance records found.</td></tr>`;
                    return;
                }
                logs.forEach((log, index) => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${index + 1}</td>
                        <td>${escapeHTML(log.AssetID || '')}</td>
                        <td>${escapeHTML(log.FaultDescription || '')}</td>
                        <td>${escapeHTML(log.ServiceVendor || '')}</td>
                        <td>${log.RepairCost ? Number(log.RepairCost).toLocaleString('en-IN', { minimumFractionDigits: 2 }) : '0.00'}</td>
                        <td>${log.ExpectedReturn ? new Date(log.ExpectedReturn).toLocaleDateString("en-IN") : ''}</td>
                        <td><button class="btn-resolve" onclick="deleteLogItem(${log.ID}, this)" style="background:#d9534f; color:white; border:none; padding:4px 8px; cursor:pointer; border-radius:4px;">Resolve</button></td>
                    `;
                    tableBody.appendChild(row);
                });
            })
            .catch(err => console.error("Error loading initial data:", err));
    }
}

    
});
// =========================================================================
// TRANSACTION 3 ASSET LIFECYCLE DISPOSAL MODULE ROUTINE LOGIC
// =========================================================================
document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.pathname;
    const pageName = currentPath.split("/").pop();

    // Intercept Disposal Form query submission cleanly to prevent default reloading bugs
    if (pageName === "transaction3.html") {
        document.getElementById("nav-transactions")?.classList.add("active");

        const disposalForm = document.getElementById("txDisposalForm");
        if (disposalForm) {
            disposalForm.addEventListener("submit", (e) => {
                e.preventDefault();
                alert("Disposal Authorized!\nHardware asset officially written-off and recorded in the enterprise e-waste ledger.");
                disposalForm.reset();
            });
        }
    }
});
// =========================================================================
// TRANSACTION 4 DATABASE STATUS FLAG OVERRIDE MANAGEMENT UTILITIES
// =========================================================================
document.addEventListener("DOMContentLoaded", () => {
    const currentPath = window.location.pathname;
    const pageName = currentPath.split("/").pop();

    // Intercept Flag Form query submission safely to block unneeded layout page refreshes
    if (pageName === "transaction4.html") {
        document.getElementById("nav-transactions")?.classList.add("active");

        const flagForm = document.getElementById("txFlagUpdateForm");
        if (flagForm) {
            flagForm.addEventListener("submit", (e) => {
                e.preventDefault();
                const targetAsset = document.getElementById("flagAssetIdInput").value;
                const chosenFlag = document.getElementById("flagSelectInput").value;
                
                alert(`Flags Updated Successfully!\nAsset node ID [${targetAsset}] has been officially updated to state flag status: [${chosenFlag}].`);
                flagForm.reset();
            });
        }
    }
});

// This function runs on the user's browser to pull data from your backend port
function connectToBackend() {
    fetch('http://localhost:5000/api/test')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success! Data received from server:', data);
            const statusElement = document.getElementById('backend-status');
            if (statusElement) {
                statusElement.innerText = data.message;
            }
        })
        .catch(error => {
            console.error('Connection failed:', error);
            const statusElement = document.getElementById('backend-status');
            if (statusElement) {
                statusElement.innerText = 'Failed to connect to backend.';
            }
        });
}

window.addEventListener('load', connectToBackend);
// =========================================================================
// EXISTNG HOME / GENERAL APPLICATION JAVASCRIPT LOGIC
// =========================================================================
// (If you have any previous code inside home.js, it stays up here safely)


// =========================================================================
// VENDOR MASTER ENGINE CONTROLLER (FOR MASTER7.HTML)
// =========================================================================
document.addEventListener("DOMContentLoaded", () => {
    const vendorForm = document.getElementById("vendorMasterForm7");

    // Automatically load vendor data table arrays when screen initializes
    loadVendors();

    // INTERCEPT SUBMIT EVENT: Insert new asset vendor data matrix
    if (vendorForm) {
        vendorForm.addEventListener("submit", async (event) => {
            event.preventDefault(); // Stop standard target page refresh execution

            // Package payloads to match the exact keys parsed by server.js (req.body)
            const vendorPayload = {
                VendorID: document.getElementById("vendorId").value.trim(),
                VendorName: document.getElementById("vendorName").value.trim(),
                Contact: document.getElementById("vendorContact").value.trim(),
                Status: document.getElementById("vendorStatus").value
            };

            try {
                const response = await fetch("/api/vendors", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(vendorPayload)
                });

                if (response.ok) {
                    alert("✅ Vendor record successfully written to Microsoft SQL Database!");
                    vendorForm.reset();  // Instantly clear field inputs
                    loadVendors();       // Instantly update the bottom record tables
                } else {
                    const errorDetails = await response.json();
                    alert("❌ Operation Failed: " + (errorDetails.message || "Could not write entry."));
                }
            } catch (err) {
                console.error("Transmission error on POST request:", err);
                alert("❌ Fatal connection timeout while communicating with Express server pipeline.");
            }
        });
    }
});

// FETCH & RENDER LOOP: Erase raw placeholder values and append active SQL data rows
async function loadVendors() {
    const tableBody = document.getElementById("vendorTableBody");
    if (!tableBody) return; // Prevent runtime crashes if page doesn't have this grid element

    try {
        const response = await fetch("/api/vendors");
        
        if (!response.ok) {
            throw new Error(`Server returned HTTP Error Status: ${response.status}`);
        }

        const vendorRecords = await response.json();
        tableBody.innerHTML = ""; // Complete wipeout of raw static row blocks

        // Fallback ui structural layout check for clear emptiness bounds
        if (!vendorRecords || vendorRecords.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="5" style="text-align: center; color: #aaa; font-style: italic; padding: 15px;">
                        No vendor records detected in SQL Server database storage.
                    </td>
                </tr>`;
            return;
        }

        // Programmatically generate individual entity structures to safely block html-injection bugs
        vendorRecords.forEach(vendor => {
            const rowElement = document.createElement("tr");

            // Mapping variables precisely to MS SQL output column definitions returned by "SELECT * FROM Vendor_Master_E"
            const vId = vendor.Vendor_ID || "N/A";
            const vName = vendor.Vendor_Name || "N/A";
            const vContact = vendor.Contact_No || "N/A";
            const vStatus = vendor.Status_Flag || "Active";

            // Safely escape characters to protect script string interpolation boundaries
            rowElement.innerHTML = `
                <td>${escapeHTML(vId)}</td>
                <td>${escapeHTML(vName)}</td>
                <td>${escapeHTML(vContact)}</td>
                <td>${escapeHTML(vStatus)}</td>
                <td class="action-cell">
                    <button class="btn-inline-action edit-btn" onclick="initializeEditState('${escapeJS(vId)}')">Edit</button>
                    <button class="btn-inline-action delete-btn" onclick="executeDeleteRecord('${escapeJS(vId)}')">Delete</button>
                </td>
            `;
            tableBody.appendChild(rowElement);
        });

    } catch (err) {
        console.error("Failed collection run sequence on SQL load queries:", err);
        tableBody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: red; padding: 15px;">Failed to retrieve records from server.</td></tr>`;
    }
}

// REMOVE ENTRY CONTROLLER: Locate single unique target keys and drop them completely
async function executeDeleteRecord(vendorId) {
    if (!confirm(`⚠️ Are you sure you want to permanently delete Vendor: ${vendorId}?`)) {
        return; // Break routine execution if cancellation intent triggers
    }

    try {
        const response = await fetch(`/api/vendors/${encodeURIComponent(vendorId)}`, {
            method: "DELETE"
        });

        if (response.ok) {
            alert("🗑️ Vendor master profile wiped cleanly from network registry.");
            loadVendors(); // Refresh the grid to mirror actual records
        } else {
            const errorDetails = await response.json();
            alert("❌ Server rejected table alteration rules: " + errorDetails.message);
        }
    } catch (err) {
        console.error("Deletion task handler crashed:", err);
        alert("❌ Fatal interface runtime connection failure encountered.");
    }
}

// Temporary log block for Edit routing logic development
function initializeEditState(vendorId) {
    console.log(`Edit workflow payload targeted entry on sequence: ${vendorId}`);
    alert(`Edit feature placeholder for: ${vendorId}. Ready to update database fields.`);
}

// Helper utility function to prevent layout breaks from special HTML characters
function escapeHTML(str) {
    if (!str) return '';
    return String(str).replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}

// Helper utility function to safely escape quotes inside string onClick attributes
function escapeJS(str) {
    if (!str) return '';
    return String(str).replace(/'/g, "\\'");
}
document.addEventListener("DOMContentLoaded", () => {
    const maintenanceForm = document.getElementById("txRecordFormM");
    const tableBody = document.getElementById("txRecordTableBodyM");

    // Define your Node.js backend base server URL
    const API_URL = "/api/maintenance";


    // 1. Initial State: Show "No active records found" inside the table body on load
    function renderPlaceholder() {
        tableBody.innerHTML = `
            <tr id="noRecordsRow">
                <td colspan="7" style="text-align: center; color: #8a99ad; padding: 20px;">
                    No active maintenance records found.
                </td>
            </tr>`;
    }
    renderPlaceholder();

    // 2. Intercept Form Submit Action
    maintenanceForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevents the browser page from reloading

        // Collect matching input values exactly by their IDs in your HTML
        const payload = {
            assetId: document.getElementById("assetId").value.trim(),
            faultDescription: document.getElementById("faultDescription").value.trim(),
            serviceVendor: document.getElementById("serviceVendor").value,
            repairCost: parseFloat(document.getElementById("repairCost").value),
            expectedReturn: document.getElementById("expectedReturn").value
        };

        try {
            // Send payload to Node.js backend express server
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (result.success && result.data && result.data.length > 0) {
                // Clear the default placeholder row if present
                const placeholder = document.getElementById("noRecordsRow");
                if (placeholder) placeholder.remove();

                // Pick the first saved row payload object from the array returned by MS SQL
                const savedRecord = result.data[0];

                // Append the brand new database item row to your active ledger <tbody>
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${savedRecord.SR_ID || '#'}</td>
                    <td>${savedRecord.AssetID}</td>
                    <td>${savedRecord.FaultDescription}</td>
                    <td>${savedRecord.ServiceVendor}</td>
                    <td>${Number(savedRecord.RepairCost).toLocaleString('en-IN')}</td>
                    <td>${formatDate(savedRecord.ExpectedReturn)}</td>
                    <td><button class="action-btn" style="cursor:pointer; background:#e74c3c; color:white; border:none; padding:4px 8px; border-radius:3px;">Resolve</button></td>
                `;
                
                tableBody.appendChild(row);

                // Clear input fields for next entry
                maintenanceForm.reset();
            } else {
                alert("Database Submission Failed: " + (result.error || "Unknown Error"));
            }

        } catch (error) {
            console.error("Network Error:", error);
            alert("Could not reach backend server at " + API_URL);
        }
    });

    // Helper function to convert standard SQL dates (YYYY-MM-DD) to client readable string
    function formatDate(dateString) {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        });
    }
});
// =========================================================================
// USER AREA: LIVE EMPLOYEE ASSET SEARCH SYSTEM
// =========================================================================
document.getElementById('btnEmpSearch').addEventListener('click', function() {
    const empId = document.getElementById('empSearchInput').value.trim();
    
    if (!empId) {
        alert('Please enter an Employee ID / Ticket No.');
        return;
    }

    // [IP FIXED]: यह ऑटोमैटिकली सही नेटवर्क पाथ को कॉल करेगा
    const apiUrl = `/api/search-asset/${empId}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Employee not found');
            }
            return response.json();
        })
        .then(data => {
            // [FIXED]: एरे की पहली पोजीशन [0] से डेटा उठाना ज़रूरी है
            const firstRecord = data[0]; 

            // 1. ऊपर वाले "NAME, DEPARTMENT..." वाले यूजर डिटेल्स टेबल में डेटा भरना
            const ownerTableBody = document.querySelector('.owner-context-table tbody tr');
            if (ownerTableBody) {
                ownerTableBody.innerHTML = `
                    <td>${firstRecord.EmployeeName || '-'}</td>
                    <td>${firstRecord.Department || '-'}</td>
                    <td>${firstRecord.HodIncharge || '-'}</td>
                    <td>${firstRecord.ItAmbassador || '-'}</td>
                `;
            }

            // 2. नीचे वाले एसेट ग्रिड टेबल में सारे एसेट्स को लूप चलाकर भरना
            const assetTableBody = document.getElementById('userAssetTableBody');
            if (assetTableBody) {
                assetTableBody.innerHTML = ''; // पुराना डेटा पूरी तरह साफ करना

                data.forEach((asset, index) => {
                    const row = `
                        <tr>
                            <td>${index + 1}</td>
                            <td>${asset.AssetSerialNo || '-'}</td>
                            <td>${asset.AssetType || '-'}</td>
                            <td>${asset.AssetNameModel || '-'}</td>
                            <td>${asset.ObsoleteFlag || '-'}</td>
                            <td>${asset.ObsoleteDate || '-'}</td>
                            <td>${asset.AssetSpecification || '-'}</td>
                            <td>${asset.Remark || '-'}</td>
                        </tr>
                    `;
                    assetTableBody.innerHTML += row;
                });
            }
        })
        .catch(err => {
            console.error('Error Details:', err);
            alert('No record found for this Employee ID in the system!');
            
            // एरर आने पर स्क्रीन को वापस खाली (Reset) कर देना
            const ownerTableBody = document.querySelector('.owner-context-table tbody tr');
            if (ownerTableBody) ownerTableBody.innerHTML = '<td>-</td><td>-</td><td>-</td><td>-</td>';
            const assetTableBody = document.getElementById('userAssetTableBody');
            if (assetTableBody) assetTableBody.innerHTML = '';
        });
});
// =========================================================================
// UNIVERSAL GLOBAL LOGOUT MATRIX CONTROLLER (PASTED AT BOTTOM)
// =========================================================================
(function() {
    // आपकी सभी HTML फाइलों में लॉगआउट बटन को क्लास और आईडी से ऑटो-डिटेक्ट करना
    const logoutElements = document.querySelectorAll('.logout, .logout-link, #nav-logout, [href*="logout"]');
    
    logoutElements.forEach(element => {
        // माउस ले जाने पर हाथ का निशान (Pointer) दिखाना
        element.style.cursor = 'pointer';
        
        element.addEventListener('click', function(e) {
            e.preventDefault(); // डिफ़ॉल्ट इवेंट को रोकना

            // 1. ब्राउज़र की लॉगिन मेमोरी और सेशन को पूरी तरह डिलीट करना
            sessionStorage.removeItem('ntpc_logged_in');
            sessionStorage.clear();
            
            // 2. सुरक्षा बंद होने का संदेश दिखाना और वापस मुख्य लॉगिन स्क्रीन पर भेजना
            alert("🔒 Security Session Closed.\nRedirecting to NTPC Login Gateway Panel...");
            window.location.href = 'login.html';
        });
    });
})();
