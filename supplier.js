$(document).ready(function() {
    let supplierId = 1; // Counter for supplier IDs

    // Form Validation and Submission
    $("#supplierForm").on("submit", function(e) {
        e.preventDefault();
        
        // Get form values
        const supplierName = $("#supplierName").val().trim();
        const phoneNumber = $("#phoneNumber").val().trim();
        const emailAddress = $("#emailAddress").val().trim();
        const status = $("#status").val();
        
        // Validation
        let isValid = true;
        
        // Supplier Name validation
        if (supplierName.length < 2) {
            $("#supplierName").addClass("is-invalid");
            isValid = false;
        } else {
            $("#supplierName").removeClass("is-invalid");
        }
        
        // Phone number validation (accepts 10 digits)
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phoneNumber)) {
            $("#phoneNumber").addClass("is-invalid");
            isValid = false;
        } else {
            $("#phoneNumber").removeClass("is-invalid");
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailAddress)) {
            $("#emailAddress").addClass("is-invalid");
            isValid = false;
        } else {
            $("#emailAddress").removeClass("is-invalid");
        }
        
        // Status validation
        if (!status) {
            $("#status").addClass("is-invalid");
            isValid = false;
        } else {
            $("#status").removeClass("is-invalid");
        }
        
        // If form is valid, add to table
        if (isValid) {
            // Create new row in table
            const newRow = `
                <tr>
                    <td>${supplierId}</td>
                    <td>${supplierName}</td>
                    <td>${phoneNumber}</td>
                    <td>${emailAddress}</td>
                    <td><span class="badge ${status === 'Active' ? 'bg-success' : 'bg-danger'}">${status}</span></td>
                </tr>
            `;
            
            // Append new row to table
            $("#supplierTableBody").append(newRow);
            
            // Increment supplier ID counter
            supplierId++;
            
            // Reset form and close modal
            this.reset();
            $("#supplierModal").modal("hide");
            
            // Show success message
            alert("Supplier added successfully!");
        }
    });
    
    // Reset form when modal is closed
    $("#supplierModal").on("hidden.bs.modal", function() {
        $("#supplierForm").trigger("reset");
        $(".is-invalid").removeClass("is-invalid");
    });
    
    // Clear validation styling on input
    $("input, select").on("input", function() {
        $(this).removeClass("is-invalid");
    });
});