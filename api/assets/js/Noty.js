 if (flash.success && flash.success.length > 0) {
    new Noty({
        theme: 'relax',
        text: "<%= flash.success %>",
        type: 'success',
        layout: 'topRight',
        timeout: 1500
        
    }).show();    
}
if (flash.error && flash.error.length > 0) {
    new Noty({
        theme: 'relax',
        text: "<%= flash.error %>",
        type: 'error',
        layout: 'topRight',
        timeout: 1500
        
    }).show();    
}